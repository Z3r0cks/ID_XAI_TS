import { InterType } from "../../enums/InterType";
import { SliderInteraction } from "./SliderInteraction";
import { WheelInteraction } from "./WheelInteraction";
export class InteractionFactory {
    constructor(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene) {
        this._interactionHandler = this.buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene);
    }
    get interactionHandler() {
        return this._interactionHandler;
    }
    buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene) {
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
//# sourceMappingURL=InteractionFactory.js.map