import { Layer } from './Layer';
import { Neuron } from './Neuron';
import { LayerType } from '../enums/LayerType';
export class NeuralNetwork {
    constructor(tfNeuralNetwork) {
        this._layers = [];
        this._tfModel = tfNeuralNetwork;
    }
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
        // console.log(this._tfModel.layers[4].getWeights());
        this._tfModel.layers.forEach((tfLayer, index) => {
            const weights = tfLayer.getWeights();
            const weightValues = weights[0].arraySync();
            const biasValues = weights[1].arraySync();
            // console.log("weightValues", weightValues);
            // console.log("biasValues", biasValues);
            // console.log("----------------------------");
            const neurons = weightValues.map((neuronWeights, i) => {
                const biasValue = i < biasValues.length ? biasValues[i] : 0; // Standardwert verwenden, falls kein Bias-Wert vorhanden
                return new Neuron(neuronWeights, biasValue);
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