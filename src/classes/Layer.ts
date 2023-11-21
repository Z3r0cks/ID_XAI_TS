import { Neuron } from './Neuron';
import { LayerType } from './LayerType';

/**
 * Class representing a layer of neurons.
 */
export class Layer {
   /**
     * Create a new Layer.
     * @param _neurons neurons of the layer.
     * @param _layerType type of the layer (input, hidden and output).
     */
   private _neurons: Neuron[];
   private _layerType: LayerType

   constructor(neurons: Neuron[], layerType: LayerType) {
      this._neurons = neurons;
      this._layerType = layerType;
   }

   public get neurons(): Neuron[] {
      return this._neurons;
   }

   public get layerType(): LayerType {
      return this._layerType;
   }
}
