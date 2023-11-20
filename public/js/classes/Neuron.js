export class Neuron {
    constructor(weights, bias) {
        this._weights = weights;
        this._bias = bias;
    }
    get weights() {
        return this._weights;
    }
    get bias() {
        return this._bias;
    }
}
