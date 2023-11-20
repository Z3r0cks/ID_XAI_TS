import { Neuron } from './Neuron';
import { LayerType } from './LayerType';

export class Layer {
   private _neurons: Neuron[];
   private _layerType: LayerType

   constructor(neurons: Neuron[], layerType: LayerType) {
      this._neurons = neurons;
      this._layerType = layerType;
   }

   public get neurons(): Neuron[] {
      return this._neurons;
   }
}
