import { Layer } from './Layer';
import { Neuron } from './Neuron';
import { LayerType } from './LayerType';
export class NeuralNetwork {
    constructor(tfNeuralNetwork) {
        this._layers = [];
        this._tfModel = tfNeuralNetwork;
    }
    // public get layers(): Layer[] {
    //    // return this._layers;
    // }
    get tfNeuralNetwork() {
        return this._tfModel;
    }
    getNeuronCounts() {
        return this._tfModel.layers.map(layer => {
            return layer.getConfig().units;
        });
    }
    generateLayers() {
        const totalLayers = this._tfModel.layers.length;
        this._tfModel.layers.forEach((tfLayer, index) => {
            const weights = tfLayer.getWeights();
            const weightValues = weights[0].arraySync();
            const biasValues = weights[1].arraySync();
            const neurons = weightValues.map((neuronWeights, i) => {
                return new Neuron(neuronWeights, biasValues[i]);
            });
            let layerType;
            if (index === 0) {
                layerType = LayerType.Input;
            }
            else if (index === totalLayers - 1) {
                layerType = LayerType.Output;
            }
            else {
                layerType = LayerType.Hidden;
            }
            const layer = new Layer(neurons, layerType);
            this._layers.push(layer);
        });
    }
}
//# sourceMappingURL=NeuralNetwork.js.map