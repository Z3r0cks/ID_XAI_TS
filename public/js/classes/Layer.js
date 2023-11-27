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
    constructor(neurons, layerType) {
        this._neurons = neurons;
        this._layerType = layerType;
    }
    get neurons() {
        return this._neurons;
    }
    get layerType() {
        return this._layerType;
    }
}
//# sourceMappingURL=Layer.js.map