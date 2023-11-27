import { Neuron } from './Neuron';
import { LayerType } from '../enums/LayerType';

/**
 * Class representing a layer of neurons.
 * @since 1.0.0
 * @see Neuron
 */
export class Layer {
   private _neurons: Neuron[];
   private _layerType: LayerType

   /**
    * Create a new Layer.
    * @param {Neuron[]} neurons - neurons of the layer.
    * @param {LayerType} layerType - type of the layer (input, hidden and output).
    * @example
    * const layer = new Layer([new Neuron(), new Neuron()], LayerType.Input);
    */
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
