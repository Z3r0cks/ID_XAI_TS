import { Layer } from './Layer';
import * as tf from '@tensorflow/tfjs';
import { Neuron } from './Neuron';
import { LayerType } from '../enums/LayerType';
export class NeuralNetwork {
    constructor(VNNCountState) {
        this._hiddenLayers = [];
        this._VNNCountState = VNNCountState;
        this._tfModel = tf.sequential();
    }
    get tfNeuralNetwork() {
        return this._tfModel;
    }
    get inputLayer() {
        return this._inputLayer;
    }
    get hiddenLayers() {
        return this._hiddenLayers;
    }
    get outputLayer() {
        return this._outputLayer;
    }
    createLayers() {
        const inputNeurons = [];
        for (let i = 0; i < this._VNNCountState[0][0]; i++) {
            inputNeurons.push(new Neuron([], 0));
        }
        this._inputLayer = new Layer({ neurons: inputNeurons, layerType: LayerType.Input });
        this._VNNCountState[1].forEach((hiddenLayer, index) => {
            const hiddenNeurons = [];
            for (let i = 0; i < hiddenLayer[0]; i++) {
                hiddenNeurons.push(new Neuron([], 0));
            }
            this._hiddenLayers[index] = new Layer({ neurons: hiddenNeurons, layerType: LayerType.Hidden });
        });
        const outputNeurons = [];
        for (let i = 0; i < this._VNNCountState[2][0]; i++) {
            outputNeurons.push(new Neuron([], 0));
        }
        this._outputLayer = new Layer({ neurons: outputNeurons, layerType: LayerType.Output });
    }
    getNeuronCounts() {
        return this._tfModel.layers.map(layer => {
            return layer.getConfig().units;
        });
    }
    clearLayers() {
        this._inputLayer = null;
        this._hiddenLayers = [];
        this._outputLayer = null;
    }
    classModelIntoTfModel() {
        this.createLayers();
        this._tfModel.add(tf.layers.dense({ units: this._inputLayer.neurons.length, inputShape: [this._inputLayer.neurons.length] }));
        this._hiddenLayers.forEach(layer => {
            this._tfModel.add(tf.layers.dense({ units: layer.neurons.length, activation: 'relu' }));
        });
        this._tfModel.add(tf.layers.dense({ units: this._outputLayer.neurons.length, activation: 'softmax' }));
        this.tfDataIntoClassModel();
    }
    tfDataIntoClassModel() {
        this.clearLayers();
        const layerCount = this._tfModel.layers.length;
        this._tfModel.layers.forEach((tfLayer, index) => {
            const weights = tfLayer.getWeights();
            if (weights.length > 0) {
                const weightMatrix = weights[0].arraySync(); // matrix of weights
                const biasValues = weights.length > 1 ? weights[1].arraySync() : []; // bias values 
                // Erstellen des neuen Layer-Objekts
                const newLayer = new Layer();
                newLayer.setNeuronsFromWeights(weightMatrix, biasValues);
                // Bestimmen des Layer-Typs
                if (index === 0) {
                    newLayer.layerType = LayerType.Input;
                    this._inputLayer = newLayer;
                }
                else if (index === layerCount - 1) {
                    newLayer.layerType = LayerType.Output;
                    this._outputLayer = newLayer;
                }
                else {
                    newLayer.layerType = LayerType.Hidden;
                    this._hiddenLayers.push(newLayer);
                }
            }
        });
    }
}
//       // Die Anzahl der Neuronen im aktuellen Layer entspricht der Länge des Bias-Vektors
//       const numberOfNeurons = biasValues.length;
//       // Erstellung der Neuronen für den aktuellen Layer
//       for (let i = 0; i < numberOfNeurons; i++) {
//          const neuronWeights = weightMatrix.map(row => row[i]);
//          const biasValue = biasValues[i] || 0; // Falls kein Bias vorhanden, wird 0 verwendet
//          neurons.push(new Neuron(neuronWeights, biasValue));
//       }
//       // Erstellung und Hinzufügen des Layers
//       const layerType = index === 0 ? LayerType.Input : (index === this._tfModel.layers.length - 1 ? LayerType.Output : LayerType.Hidden);
//       const layer = new Layer(neurons, layerType);
//       this._layers.push(layer);
//    }
// });
//# sourceMappingURL=NeuralNetwork.js.map