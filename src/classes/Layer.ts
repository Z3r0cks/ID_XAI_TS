import { Neuron } from './Neuron';
import { LayerType } from './LayerType';

export class Layer {
   private _neurons: Neuron[];
   private _layerType: typeof LayerType;

   constructor(neurons: Neuron[], layerType: typeof LayerType) {
      this._neurons = neurons;
      this._layerType = layerType;
   }

   public get neurons(): Neuron[] {
      return this._neurons;
   }
}