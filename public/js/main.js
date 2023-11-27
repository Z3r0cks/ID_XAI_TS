import { NeuralNetwork } from "./classes/NeuralNetwork";
import { InputHandler } from "./classes/InputHandler";
import { ThreeJSComponentFactory } from "./classes/ThreeJSComponentFactory";
import { TfModel } from "./classes/TfModel";
const sphereDistance = 1.5;
function main() {
    new InputHandler();
    const threeJSScene = new ThreeJSComponentFactory();
    const tFModel = new TfModel(3, [[3], [3], [3], [3]], 3);
    const model = tFModel.createModel();
    const NN = new NeuralNetwork(model);
    NN.generateLayers();
    console.log(NN);
    threeJSScene.createVisualLayer(3, sphereDistance);
    threeJSScene.render();
}
main();
//# sourceMappingURL=main.js.map