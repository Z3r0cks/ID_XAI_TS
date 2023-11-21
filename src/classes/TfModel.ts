import * as tf from '@tensorflow/tfjs';

export class TfModel {
   private _tfModel: tf.Sequential;

   constructor(tfModel: tf.Sequential) {
      this._tfModel = tfModel
   }

   public get tfModel(): tf.Sequential {
      return this._tfModel;
   }

   addDenseLayers(layers: [units: number]) {
      layers.forEach(() => {
         // this._tfModel.add(tf.layers.dense({ layer[units]: 3 }));
      });
   }
}