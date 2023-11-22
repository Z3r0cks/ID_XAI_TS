import { InterType } from "../../enums/InterType";
import { NeuralNetwork } from "../NeuralNetwork";
import { InteractionHandler } from "./InteractionHandler";
import { SliderInteraction } from "./SliderInteraction";
import { WheelInteraction } from "./WheelInteraction";

export class InteractionFactory {
    private _interactionHandler: InteractionHandler;
    public get interactionHandler(): InteractionHandler {
        return this._interactionHandler;
    }

    constructor(_interactionType: InterType, _renderer: THREE.Renderer, _camera: THREE.PerspectiveCamera, _neuralNetwork: NeuralNetwork, _raycaster: THREE.Raycaster, _scene:THREE.Scene) {
        this._interactionHandler = this.buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene)
    }

    buildInteractionHandler(
        _interactionType: InterType, 
        _renderer: THREE.Renderer,
        _camera: THREE.PerspectiveCamera, 
        _neuralNetwork: NeuralNetwork,
        _raycaster: THREE.Raycaster,
        _scene: THREE.Scene): InteractionHandler
         
    {
        switch (_interactionType) {
            case InterType.Slider:
                return new SliderInteraction(_camera, _renderer);
            case InterType.Wheel:
                return new WheelInteraction(_camera, _renderer, _raycaster, _scene);
            default:
                return new SliderInteraction(_camera, _renderer);
        }
    }
}