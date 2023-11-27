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

      this._tfModel.layers.forEach((tfLayer, index) => {
         const weights = tfLayer.getWeights();

         const weightValues: number[][] = weights[0].arraySync() as number[][];
         const biasValues: number[] = weights[1].arraySync() as number[];

         // console.log("weightValues", weightValues);
         // console.log("biasValues", biasValues);
         // console.log("----------------------------");
         const neurons: Neuron[] = weightValues.map((neuronWeights: number[], i: number) => {
            const biasValue = i < biasValues.length ? biasValues[i] : 0; // Standardwert verwenden, falls kein Bias-Wert vorhanden
            return new Neuron(neuronWeights, biasValue);
         });


         let layerType: LayerType;
         if (index === 0) {
            layerType = LayerType.Input;
         } else if (index === totalLayers - 1) {
            layerType = LayerType.Output;
         } else {
            layerType = LayerType.Hidden;
         }

         const layer = new Layer(neurons, layerType);
         this._layers.push(layer);
      });
   }

}  