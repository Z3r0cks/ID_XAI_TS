export class InteractionHandler {
    get camera() {
        return this._camera;
    }
    get renderer() {
        return this._renderer;
    }
    constructor(_camera, _renderer) {
        this._camera = _camera;
        this._renderer = _renderer;
        window.addEventListener('resize', this.onWindowResize, false);
    }
    onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
//# sourceMappingURL=InteractionHandler.js.map