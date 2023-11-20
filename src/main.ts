import { NeuralNetwork } from "./classes/NeuralNetwork";
import { Layer } from "./classes/Layer";
import { LayerType } from "./classes/LayerType";
import { Neuron } from "./classes/Neuron";
import * as tf from '@tensorflow/tfjs';

const test = new NeuralNetwork([
   new Layer([new Neuron([1, 2, 3], 1)], LayerType),
   new Layer([new Neuron([1, 2, 3], 1)], LayerType),
   new Layer([new Neuron([1, 2, 3], 1)], LayerType)
]);

console.log(test);
