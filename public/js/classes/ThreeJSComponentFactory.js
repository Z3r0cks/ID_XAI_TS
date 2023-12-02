import * as THREE from 'three';
export class ThreeJSComponentFactory {
    constructor() {
        this.setVNNState = (pos, type, neurons) => {
            if (type === 'input') {
                this._VNNCountState[0] = [];
                this._VNNCountState[0].push(neurons);
            }
            else if (type === 'hidden') {
                this._VNNCountState[1][pos] = [];
                this._VNNCountState[1][pos].push(neurons);
            }
            else if (type === 'output') {
                this._VNNCountState[2] = [];
                this._VNNCountState[2].push(neurons);
            }
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
            const allInputHiddenElements = document.querySelectorAll(".inputHidden");
            if (allInputHiddenElements.length == 0)
                return;
            const hiddenInputs = Array.from(allInputHiddenElements).filter((element) => element instanceof HTMLInputElement);
            let count = 0;
            const inputLength = this._VNNState[0].length;
            // connection between input and hidden layer
            for (let i = 0; i < inputLength; i++) {
                for (let j = 0; j < parseInt(hiddenInputs[0].value); j++) {
                    for (let k = 0; k < this._VNNState[1][count].length; k++) {
                        this.drawLine(this._VNNState[0][i], this._VNNState[1][count][k]);
                    }
                }
            }
            // connection between hidden and hidden layer
            // connection between hidden and output layer
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
        this._camera.position.z = 10;
        this._VNNCountState = [[1], [[1]], [1]];
        this._VNNState = [[], [[]], []];
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
    }
    drawLine(startNode, endNode, color = 0x787c7c) {
        // Erstellen einer Vektorreihe, die die Positionen der Knoten enthält
        const points = [];
        points.push(startNode.position.clone());
        points.push(endNode.position.clone());
        // Erstellen einer Liniengeometrie aus den Punkten
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: color });
        // Erstellen einer Linie mit der definierten Geometrie und dem Material
        const line = new THREE.Line(geometry, material);
        // line.isLine = true;
        line.renderOrder = -1;
        this._scene.add(line);
        return line;
    }
}
//# sourceMappingURL=ThreeJSComponentFactory.js.map