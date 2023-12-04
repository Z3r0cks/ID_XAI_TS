import * as THREE from 'three';
export class ThreeJSComponentFactory {
    constructor() {
        this.setVNNState = (pos, type, neuron, skipCreateVisualLayer) => {
            if (type === 'input') {
                this._VNNCountState[0] = [];
                this._VNNCountState[0].push(neuron);
            }
            else if (type === 'hidden') {
                this._VNNCountState[1][pos] = [];
                this._VNNCountState[1][pos].push(neuron);
            }
            else if (type === 'output') {
                this._VNNCountState[2] = [];
                this._VNNCountState[2].push(neuron);
            }
            if (!skipCreateVisualLayer)
                this.createVisualLayer(0.5);
        };
        this.createVisualLayer = (circleDistance) => {
            this._scene.clear();
            const getAllLayerCount = this.getAllLayerCount();
            const radius = 0.3;
            const diarmeter = 2 * radius;
            // input layer parse and positioning
            const xPositionInput = -1 * (getAllLayerCount * diarmeter + (getAllLayerCount - 1) * (circleDistance / this.getHiddenLayerCount()));
            const inputHeight = this._VNNCountState[0][0] * (diarmeter) + (this._VNNCountState[0][0] - 1) * circleDistance;
            let yPositionInput = inputHeight / 2 - radius;
            this._VNNState[0] = [];
            for (let i = 0; i < this._VNNCountState[0][0]; i++) {
                this._VNNState[0].push(this.createVisualNeuron(1, xPositionInput, yPositionInput, circleDistance, 0x13b49f));
                yPositionInput -= (diarmeter + circleDistance);
            }
            // hidden layer parse and positioning
            for (let i = 0; i < this._VNNCountState[1].length; i++) {
                const xPositionHidden = (((-1 * (getAllLayerCount * diarmeter + (getAllLayerCount - 1) * (circleDistance / this.getHiddenLayerCount()))) + (i + 1) * diarmeter + (i + 1) * circleDistance) + i / 2) + 0.5;
                const hiddenHeigt = this._VNNCountState[1][i][0] * (diarmeter) + (this._VNNCountState[1][i][0] - 1) * circleDistance;
                let yPositionHidden = hiddenHeigt / 2 - radius;
                this._VNNState[1][i] = [];
                for (let j = 0; j < this._VNNCountState[1][i][0]; j++) {
                    this._VNNState[1][i].push(this.createVisualNeuron(1, xPositionHidden, yPositionHidden, circleDistance, 0x9f9f57));
                    yPositionHidden -= (diarmeter + circleDistance);
                }
            }
            // output layer parse and positioning
            const xPositionOutput = ((-1 * (getAllLayerCount * diarmeter + (getAllLayerCount - 1) * (circleDistance / this.getHiddenLayerCount()))) + (this.getHiddenLayerCount() + 1) * diarmeter + (this.getHiddenLayerCount() + 1) * circleDistance) + this.getHiddenLayerCount() / 2 + 0.5;
            const outputHeigt = this._VNNCountState[2][0] * (diarmeter) + (this._VNNCountState[2][0] - 1) * circleDistance;
            let yPositionOutput = outputHeigt / 2 - radius;
            this._VNNState[2] = [];
            for (let i = 0; i < this._VNNCountState[2][0]; i++) {
                this._VNNState[2].push(this.createVisualNeuron(1, xPositionOutput, yPositionOutput, circleDistance, 0xac3e3e));
                yPositionOutput -= (diarmeter + circleDistance);
            }
            this.setConnection();
            this.render();
        };
        this.setConnection = () => {
            try {
                if (!this._toggleConnection)
                    return;
                const allInputHiddenElements = document.querySelectorAll(".inputHidden");
                if (allInputHiddenElements.length == 0)
                    return;
                const hiddenInputs = Array.from(allInputHiddenElements).filter((element) => element instanceof HTMLInputElement);
                // connection between input and hidden layer
                const inputLength = this._VNNState[0].length;
                for (let i = 0; i < inputLength; i++) {
                    for (let j = 0; j < parseInt(hiddenInputs[0].value); j++) {
                        for (let k = 0; k < this._VNNState[1][0].length; k++) {
                            this.drawLine(this._VNNState[0][i], this._VNNState[1][0][k], 0xffffff);
                        }
                    }
                }
                // connection between hidden and hidden layer
                for (let i = 0; i < hiddenInputs.length - 1; i++) {
                    const leftLayer = parseInt(hiddenInputs[i].value);
                    const rightLayer = parseInt(hiddenInputs[i + 1].value);
                    for (let j = 0; j < leftLayer; j++) {
                        for (let k = 0; k < rightLayer; k++) {
                            this.drawLine(this._VNNState[1][i][j], this._VNNState[1][i + 1][k], 0xffffff);
                        }
                    }
                }
                // connection between output layer and last hidden layer
                const outputLength = this._VNNState[2].length;
                for (let i = 0; i < outputLength; i++) {
                    for (let j = 0; j < parseInt(hiddenInputs[hiddenInputs.length - 1].value); j++) {
                        this.drawLine(this._VNNState[2][i], this._VNNState[1][hiddenInputs.length - 1][j], 0xffffff);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
            this.render();
        };
        this.removeConnection = () => {
            this._allConnection.forEach(connection => {
                this._scene.remove(connection);
            });
            this._allConnection = [];
            this.render();
        };
        this.getHiddenLayerCount = () => {
            return this._VNNCountState[1].length;
        };
        this.getAllLayerCount = () => {
            const hidden = this._VNNCountState[1].length != undefined ? this._VNNCountState[1].length : 0;
            return hidden + 2;
        };
        this.createVisualNeuron = (neuron, xPosition, zPosition, circleDistance, color) => {
            const circleGeometry = new THREE.CircleGeometry(0.3, 32);
            const material = new THREE.MeshBasicMaterial({ color: color });
            const circle = new THREE.Mesh(circleGeometry, material);
            circle.position.set(xPosition, neuron * circleDistance - zPosition, 0);
            this._scene.add(circle);
            return circle;
        };
        this.deleteNotUsedLayers = (layerCount) => {
            if (this._VNNCountState[1].length > layerCount) {
                this._VNNCountState[1].splice(layerCount, this._VNNCountState[1].length - layerCount);
            }
        };
        this.render = () => {
            this._renderer.render(this._scene, this._camera);
        };
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setClearColor(0x343541, 1);
        this._camera.position.z = 10;
        this._VNNCountState = [[1], [[]], [1]];
        this._VNNState = [[], [[]], []];
        this._allConnection = [];
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._toggleConnection = true;
        document.body.appendChild(this._renderer.domElement);
    }
    get VNNCountState() {
        return this._VNNCountState;
    }
    set toggleConnection(toggleConnection) {
        this._toggleConnection = toggleConnection;
        if (toggleConnection) {
            this.setConnection();
        }
        else {
            this.removeConnection();
        }
    }
    drawLine(startNode, endNode, color) {
        const points = [];
        points.push(startNode.position.clone());
        points.push(endNode.position.clone());
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: color });
        const line = new THREE.Line(geometry, material);
        line.renderOrder = -1;
        this._allConnection.push(line);
        this._scene.add(line);
        return line;
    }
}
//# sourceMappingURL=ThreeJSComponentFactory.js.map