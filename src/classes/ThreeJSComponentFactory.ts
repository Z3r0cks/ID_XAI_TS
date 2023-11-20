import * as THREE from 'three';

export class ThreeJSComponentFactory {
   private _scene: THREE.Scene;
   private _camera: THREE.PerspectiveCamera;
   private _renderer: THREE.WebGLRenderer;

   constructor() {
      this._scene = new THREE.Scene();
      this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this._renderer = new THREE.WebGLRenderer();
      this._camera.position.z = 10;
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this._renderer.domElement);
   }

   createVisualLayer = (neuronCount: number, sphereDistance: number): void => {
      for (let i = 0; i < neuronCount; i++) {
         this.createVisualNeuron(i, sphereDistance);
      }
   }

   createVisualNeuron = (pos: number, sphereDistance: number): void => {
      const circleGeometry = new THREE.CircleGeometry(0.5, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x9f9f57 });
      const circle = new THREE.Mesh(circleGeometry, material);
      circle.position.y = pos * sphereDistance * sphereDistance / 2;
      circle.position.x = pos * 3;
      console.log(circle.position.y);
      this._scene.add(circle);
   }

   render = (): void => {
      this._renderer.render(this._scene, this._camera);
   }
}