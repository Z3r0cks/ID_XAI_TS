import { ThreeJSComponentFactory } from "./ThreeJSComponentFactory";
import { NeuralNetwork } from "./NeuralNetwork";

export class InputHandler {
   private _inputScale: HTMLInputElement;
   private _hiddenLayerCount: HTMLInputElement;
   private _outputScale: HTMLInputElement;
   private _hiddenLayerWrapper: HTMLDivElement;
   private _threeJSScene: ThreeJSComponentFactory;
   private _connectionCheckbox: HTMLInputElement;
   private _setModel: HTMLButtonElement;
   private _model: NeuralNetwork;

   constructor() {
      this._inputScale = document.querySelector('#inputInput') as HTMLInputElement;
      this._hiddenLayerCount = document.querySelector('#hiddenLayerCount') as HTMLInputElement;
      this._outputScale = document.querySelector('#inputOutput') as HTMLInputElement;
      this._hiddenLayerWrapper = document.querySelector('#hiddenLayerWrapper') as HTMLDivElement;
      this._hiddenLayerCount.addEventListener('input', this.addHiddenLayers);
      this._connectionCheckbox = document.querySelector('#connBox') as HTMLInputElement;
      this._setModel = document.querySelector('#setModel') as HTMLButtonElement;
      this._inputScale.addEventListener('input', this.addVirtualInputLayer);
      this._outputScale.addEventListener('input', this.addVirtualOutputLayer);
      this._connectionCheckbox.addEventListener('change', this.toggleConnections);
      this._setModel.addEventListener('click', this.createModel);
      this._threeJSScene = new ThreeJSComponentFactory();
   }

   addVirtualInputLayer = (): void => {
      const input = parseInt(this._inputScale.value);
      this._threeJSScene.setVNNState(0, "input", input)
      this._threeJSScene.render();

   }

   addVirtualOutputLayer = (): void => {
      const output = parseInt(this._outputScale.value);
      const hiddenLayerCount = parseInt(this._hiddenLayerCount.value);
      this._threeJSScene.setVNNState(hiddenLayerCount, "output", output)
      this._threeJSScene.render();
   }

   addHiddenLayers = (): void => {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < parseInt(this._hiddenLayerCount.value); i++) {
         const label = document.createElement('label');
         label.htmlFor = `inputHidden${i}`;
         label.textContent = `Hidden Layer ${i + 1}`;
         const input = document.createElement('input');
         input.id = `inputHidden${i}`;
         input.classList.add('inputHidden');
         input.type = 'range';
         input.min = '1';
         input.max = '10';
         input.value = '1';
         this._threeJSScene.setVNNState(i, "hidden", parseInt(input.value), true)

         input.addEventListener('input', () => {
            this._threeJSScene.setVNNState(i, "hidden", parseInt(input.value))
         });

         fragment.appendChild(label);
         fragment.appendChild(input);
      }
      this._hiddenLayerWrapper.innerHTML = '';
      this._threeJSScene.deleteNotUsedLayers(parseInt(this._hiddenLayerCount.value));
      this._hiddenLayerWrapper.appendChild(fragment);
      this._threeJSScene.createVisualLayer(0.5);
   }

   toggleConnections = (): void => {
      this._threeJSScene.toggleConnection = this._connectionCheckbox.checked ? true : false;
   }

   createModel = (): void => {
      this._model = new NeuralNetwork(this._threeJSScene.VNNCountState);
      this._model.classModelIntoTfModel();
      this.createModelHTML();
   }

   private createModelHTML = (): void => {
      console.log(this._model);
   }
}