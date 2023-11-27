import { NeuralNetwork } from "./classes/NeuralNetwork";
import { InputHandler } from "./classes/InputHandler";
import { ThreeJSComponentFactory } from "./classes/ThreeJSComponentFactory";
import { TfModel } from "./classes/TfModel";
const sphereDistance = 1.5;
function main() {
    new InputHandler();
    const threeJSScene = new ThreeJSComponentFactory();
    const tFModel = new TfModel(4, [[1], [2], [8], [4]], 4);
    const NN = new NeuralNetwork(tFModel.createModel());
    NN.generateLayers();
    threeJSScene.createVisualLayer(3, sphereDistance);
    threeJSScene.render();
}
main();
//# sourceMappingURL=main.js.map