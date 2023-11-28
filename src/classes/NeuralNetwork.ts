import { Layer } from './Layer';
import * as tf from '@tensorflow/tfjs';
import { Neuron } from './Neuron';
import { LayerType } from '../enums/LayerType';

export class NeuralNetwork {
   private _tfModel: tf.Sequential;
   private _layers: Layer[] = [];

   constructor(tfNeuralNetwork: tf.Sequential) {
      this._tfModel = tfNeuralNetwork
   }

   public get tfNeuralNetwork(): tf.Sequential {
      return this._tfModel;
   }

   getNeuronCounts(): number[] {
      return this._tfModel.layers.map(layer => {
         return layer.getConfig().units as number;
      });
   }

   generateLayers(): void {
      const totalLayers = this._tfModel.layers.length;
      // console.log(this._tfModel.layers[4].getWeights());

      // console.log("weightValues", weightValues);
      // console.log("biasValues", biasValues);
      // console.log("----------------------------");

      this._tfModel.layers.forEach((tfLayer, index) => {
         const weights = tfLayer.getWeights();

         if (weights.length > 0) {
            const neurons = [];
            const weightMatrix: number[][] = <number[][]>weights[0].arraySync(); // Matrix der Gewichte
            const biasValues: number[] = weights.length > 1 ? <number[]>weights[1].arraySync() : []; // Bias-Werte, oder leeres Array, wenn keine vorhanden

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