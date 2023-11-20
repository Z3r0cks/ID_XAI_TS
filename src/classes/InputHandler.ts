export class InputHandler {
   private _inputScale: HTMLInputElement;
   private _hiddenLayerCount: HTMLInputElement;
   private _outputScale: HTMLInputElement;
   private _hiddenLayerWrapper: HTMLDivElement;

   constructor() {
      this._inputScale = document.querySelector('#inputInput') as HTMLInputElement;
      this._hiddenLayerCount = document.querySelector('#hiddenLayerCount') as HTMLInputElement;
      this._outputScale = document.querySelector('#inputOutput') as HTMLInputElement;
      this._hiddenLayerWrapper = document.querySelector('#hiddenLayerWrapper') as HTMLDivElement;
      this._hiddenLayerCount.addEventListener('input', this.addHiddenLayers);
      this._hiddenLayerWrapper.addEventListener('input', this.handleInputEvent);
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

         fragment.appendChild(label);
         fragment.appendChild(input);
      }
      this._hiddenLayerWrapper.innerHTML = '';
      this._hiddenLayerWrapper.appendChild(fragment);
   }

   handleInputEvent = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      if (target && target.classList.contains('inputHidden')) {
         console.log(target.value);
         //TODO: generateVisualNN(inputInput.value, getAllHiddenLayer(), outputInput.value);
      }
   }
}