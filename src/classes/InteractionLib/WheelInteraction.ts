import THREE from "three";
import { InteractionHandler } from "./InteractionHandler";

export class WheelInteraction extends InteractionHandler {
   private mouse: THREE.Vector2 = new THREE.Vector2;
   private selectedObjects: THREE.Object3D[] = [];
   private activeObject: THREE.Object3D = new THREE.Object3D();
   private raycaster: THREE.Raycaster;
   private scene: THREE.Scene;
   private wheelListenerExists: boolean = false;

   constructor(_camera: THREE.PerspectiveCamera, _renderer: THREE.Renderer, _raycaster: THREE.Raycaster, _scene: THREE.Scene) {
      super(_camera, _renderer);
      this.raycaster = _raycaster;
      this.scene = _scene;
   }

   //TODO: Check Neurons and change states of them
   onClick(event: MouseEvent): void {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObject(this.scene, true);
   
      if (intersects.length > 0) {
         //if (intersects[0].object.neuronState != NeuronStates.SELECTED) this.selectedObjects.push(intersects[0].object);
         //changeState(intersects[0].object, NeuronStates.SELECTED);
      } else {
         for (let i = 0; i < this.selectedObjects.length; i++) {
            //changeState(selectedObjects[i], NeuronStates.FREE);
         }
         this.selectedObjects = [];
      }
   }

   //TODO: Add changeState Function
   onMouseMove(event: MouseEvent): void {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
   
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.scene, true);
      this.raycaster.layers.set(1);
   
      if (intersects.length > 0) {
         this.activeObject = intersects[0].object;
         //if (this.activeObject.neuronState != NeuronStates.SELECTED) changeState(this.activeObject, NeuronStates.ACTIVE);
         //if (!wheelListenerExists) {
         //   wheelListenerExists = true;
         //}
      } else {
         if (this.activeObject != null) {
            //if (this.activeObject.neuronState != NeuronStates.SELECTED) changeState(this.activeObject, NeuronStates.FREE);
            this.activeObject = new THREE.Object3D();;
            if (this.wheelListenerExists) {
               this.wheelListenerExists = false;
            }
         }
      }
   }
   
   //TODO: Create ChangeWeight Functionality
   onWheel(event: WheelEvent): void {
      if (this.selectedObjects.length > 0) {
         for (let i = 0; i < this.selectedObjects.length; i++) {
            //changeWeight(this.selectedObjects[i], 0.1 * -Math.sign(event.deltaY) + this.selectedObjects[i].weight);
         }
      }
      if (this.activeObject) {
         //if (this.activeObject.isNeuron && this.selectedObjects.length == 0) {
         //   changeWeight(this.activeObject, 0.1 * -Math.sign(event.deltaY) + this.activeObject.weight)
         //}
      }
   }
}