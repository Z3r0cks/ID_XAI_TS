import * as tf from '@tensorflow/tfjs';

/**
 * Class representing a tensorflow model.
 * @since 1.0.0
 */
export class TfModel {
   // private _tfModel: tf.Sequential;
   private _inputLayerUnits: number;
   private _hiddenLayer: number[][];
   private _outputLayerUnits: number;

   /**
 * Create an new TfModel.
 * @param {number} inputLayerUnits - number of units in the input layer.
 * @param {number[][]} hiddenLayer - number of units in the hidden layer.
 * @param {number} outputLayerUnits - number of units in the output layer.
 * @example
 * const tfModel = new TfModel(3, [[3], [3], [3], [3]], 3);
 */

   constructor(inputLayerUnits: number, hiddenLayer: number[][], outputLayerUnits: number) {
      this._inputLayerUnits = inputLayerUnits;
      this._hiddenLayer = hiddenLayer;
      this._outputLayerUnits = outputLayerUnits;
   }

   createModel() {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: this._inputLayerUnits, inputShape: [1] }));
      this._hiddenLayer.forEach(e => {
         model.add(tf.layers.dense({ units: e[0] }));
      });
      model.add(tf.layers.dense({ units: this._outputLayerUnits, activation: 'relu' }));

      return model;
   }
}