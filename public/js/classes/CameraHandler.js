export class CameraHandler {
    constructor(camera) {
        this._camera = camera;
        this._camera.position.z = 15;
    }
    findLongestHiddenLayer(_arr) {
        let longestLength = 0;
        for (let i = 0; i < _arr.length; i++) {
            if (_arr[i] > longestLength) {
                longestLength = _arr[i];
            }
        }
        return longestLength;
    }
    //TODO: set correct types
    adjustPosition(_neuralNodes, _vertTrans, _sphereDistance) {
        const cameraZoom = Math.max(_neuralNodes[0], this.findLongestHiddenLayer(_neuralNodes[1]), _neuralNodes[2], _neuralNodes[1].length) * _sphereDistance / 4;
        this._camera.position.z = cameraZoom < 1 ? 6 : 6 * cameraZoom;
        this._camera.position.x = _vertTrans;
    }
}
//# sourceMappingURL=CameraHandler.js.map