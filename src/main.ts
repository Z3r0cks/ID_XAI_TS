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
   const tFModel: TfModel = new TfModel(3, [[3], [3], [3], [3]], 3);
   const model = tFModel.createModel()
   const NN = new NeuralNetwork(model)

   NN.generateLayers()
   console.log(NN);

   threeJSScene.createVisualLayer(3, sphereDistance);
   threeJSScene.render();
}

main();
