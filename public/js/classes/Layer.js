import { Neuron } from './Neuron';
import { LayerType } from '../enums/LayerType';
/**
 * Class representing a layer of neurons.
 * @since 1.0.0
 * @see Neuron
 */
export class Layer {
    /**
     * Create a new Layer.
     * @param {Neuron[]} neurons - neurons of the layer.
     * @param {LayerType} layerType - type of the layer (input, hidden and output).
     * @example
     * const layer = new Layer([new Neuron(), new Neuron()], LayerType.Input);
     */
    constructor({ neurons = [], layerType = LayerType.Default } = {}) {
        this._neurons = neurons;
        this._layerType = layerType;
    }
    get neurons() {
        return this._neurons;
    }
    get layerType() {
        return this._layerType;
    }
    set layerType(layerType) {
        this._layerType = layerType;
    }
    setNeuronsFromWeights(weightMatrix, biasValues) {
        this._neurons = weightMatrix[0].map((_, colIndex) => {
            const weights = weightMatrix.map(row => row[colIndex]);
            const bias = biasValues.length > colIndex ? biasValues[colIndex] : 0;
            return new Neuron(weights, bias);
        });
    }
}
//# sourceMappingURL=Layer.js.map