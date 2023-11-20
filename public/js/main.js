import { InputHandler } from "./classes/InputHandler";
import { ThreeJSComponentFactory } from "./classes/ThreeJSComponentFactory";
import * as tf from '@tensorflow/tfjs';
const sphereDistance = 1.5;
function main() {
    new InputHandler();
    const threeJSScene = new ThreeJSComponentFactory();
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 3, inputShape: [1] }));
    model.add(tf.layers.dense({ units: 3 }));
    model.add(tf.layers.dense({ units: 3 }));
    threeJSScene.createVisualLayer(3, sphereDistance);
    threeJSScene.render();
}
main();
// const test = new NeuralNetwork([
//    new Layer([new Neuron([1, 2, 3], 1)], LayerType.Input),
//    new Layer([new Neuron([1, 2, 3], 1)], LayerType.Hidden),
//    new Layer([new Neuron([1, 2, 3], 1)], LayerType.Output)
// ]);
// console.log(model.layers.length);
//# sourceMappingURL=main.js.map