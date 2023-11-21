/**
 * Class representing a layer of neurons.
 */
export class Layer {
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