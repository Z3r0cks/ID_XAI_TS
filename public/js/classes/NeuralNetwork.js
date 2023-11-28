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
        // console.log("weightValues", weightValues);
        // console.log("biasValues", biasValues);
        // console.log("----------------------------");
        this._tfModel.layers.forEach((tfLayer, index) => {
            const weights = tfLayer.getWeights();
            if (weights.length > 0) {
                const neurons = [];
                const weightMatrix = weights[0].arraySync(); // Matrix der Gewichte
                const biasValues = weights.length > 1 ? weights[1].arraySync() : []; // Bias-Werte, oder leeres Array, wenn keine vorhanden
                // Die Anzahl der Neuronen im aktuellen Layer entspricht der Länge des Bias-Vektors
                const numberOfNeurons = biasValues.length;
                // Erstellung der Neuronen für den aktuellen Layer
                for (let i = 0; i < numberOfNeurons; i++) {
                    const neuronWeights = weightMatrix.map(row => row[i]);
                    const biasValue = biasValues[i] || 0; // Falls kein Bias vorhanden, wird 0 verwendet
                    neurons.push(new Neuron(neuronWeights, biasValue));
                }
                // Erstellung und Hinzufügen des Layers
                const layerType = index === 0 ? LayerType.Input : (index === this._tfModel.layers.length - 1 ? LayerType.Output : LayerType.Hidden);
                const layer = new Layer(neurons, layerType);
                this._layers.push(layer);
            }
        });
    }
}
//# sourceMappingURL=NeuralNetwork.js.map