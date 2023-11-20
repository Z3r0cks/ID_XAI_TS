import { Layer } from './Layer';

export class NeuralNetwork {
   private _layers: Layer[];

   constructor(layers: Layer[]) {
      this._layers = layers;
   }

   public get layers(): Layer[] {
      return this._layers;
   }
}