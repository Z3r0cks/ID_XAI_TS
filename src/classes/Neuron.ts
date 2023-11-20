export class Neuron {
   private _weights: number[];
   private _bias: number;

   constructor(weights: number[], bias: number) {
      this._weights = weights;
      this._bias = bias;
   }

   public get weights() {
      return this._weights;
   }

   public get bias() {
      return this._bias;
   }
}