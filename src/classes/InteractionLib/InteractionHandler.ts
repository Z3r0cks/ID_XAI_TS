export class InteractionHandler {
   private _camera: THREE.PerspectiveCamera;
   
   private _renderer: THREE.Renderer;
   
   public get camera(): THREE.PerspectiveCamera {
      return this._camera;
   }
   public get renderer(): THREE.Renderer {
      return this._renderer;
   }

   constructor(_camera: THREE.PerspectiveCamera, _renderer: THREE.Renderer) {
      this._camera = _camera;
      this._renderer = _renderer;
      window.addEventListener('resize', this.onWindowResize, false);
   }
    
   onWindowResize(): void {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(window.innerWidth, window.innerHeight);
   }
}