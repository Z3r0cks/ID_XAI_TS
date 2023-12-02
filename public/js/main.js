import { NeuralNetwork } from "./classes/NeuralNetwork";
import { InputHandler } from "./classes/InputHandler";
import { TfModel } from "./classes/TfModel";
const sphereDistance = 1.5;
function main() {
    const inputHandler = new InputHandler();
    // const threeJSScene: ThreeJSComponentFactory = new ThreeJSComponentFactory();
    const tFModel = new TfModel(4, [[1], [2], [8], [4]], 4);
    const NN = new NeuralNetwork(tFModel.createModel());
    NN.generateLayers();
    // threeJSScene.createVisualLayer(NN, 3, sphereDistance);
    // threeJSScene.render();
}
main();
//# sourceMappingURL=main.js.map