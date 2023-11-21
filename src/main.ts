import { NeuralNetwork } from "./classes/NeuralNetwork";
import { Layer } from "./classes/Layer";
import { LayerType } from "./classes/LayerType";
import { Neuron } from "./classes/Neuron";
import { InputHandler } from "./classes/InputHandler";
import { ThreeJSComponentFactory } from "./classes/ThreeJSComponentFactory";
import * as tf from '@tensorflow/tfjs';

const sphereDistance = 1.5;

function main() {
   new InputHandler();
   const threeJSScene: ThreeJSComponentFactory = new ThreeJSComponentFactory();
   const model: tf.Sequential = tf.sequential();
   model.add(tf.layers.dense({ units: 3, inputShape: [1] }));
   model.add(tf.layers.dense({ units: 3 }));
   model.add(tf.layers.dense({ units: 3 }));
   model.add(tf.layers.dense({ units: 3 }));
   model.add(tf.layers.dense({ units: 3 }));
   const NN = new NeuralNetwork(model)

   NN.generateLayers()
   console.log(NN);

   threeJSScene.createVisualLayer(3, sphereDistance);
   threeJSScene.render();
}

main();
