import { NeuralNetwork } from "./classes/NeuralNetwork";
import { Layer } from "./classes/Layer";
import { LayerType } from "./enums/LayerType";
import { Neuron } from "./classes/Neuron";
import { InputHandler } from "./classes/InputHandler";
import { ThreeJSComponentFactory } from "./classes/ThreeJSComponentFactory";
import * as tf from '@tensorflow/tfjs';
import { TfModel } from "./classes/TfModel";

const sphereDistance = 1.5;

function main() {
   new InputHandler();
   const threeJSScene: ThreeJSComponentFactory = new ThreeJSComponentFactory();
   const tFModel: TfModel = new TfModel(4, [[1], [2], [8], [4]], 4);
   const NN = new NeuralNetwork(tFModel.createModel());

   NN.generateLayers()

   threeJSScene.createVisualLayer(3, sphereDistance);
   threeJSScene.render();
}

main();
