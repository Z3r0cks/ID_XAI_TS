export class InputHandler {
    constructor() {
        this.addHiddenLayers = () => {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < parseInt(this._hiddenLayerCount.value); i++) {
                const label = document.createElement('label');
                label.htmlFor = `inputHidden${i}`;
                label.textContent = `Hidden Layer ${i + 1}`;
                const input = document.createElement('input');
                input.id = `inputHidden${i}`;
                input.classList.add('inputHidden');
                input.type = 'range';
                input.min = '1';
                input.max = '10';
                input.value = '1';
                fragment.appendChild(label);
                fragment.appendChild(input);
            }
            this._hiddenLayerWrapper.innerHTML = '';
            this._hiddenLayerWrapper.appendChild(fragment);
        };
        this.handleInputEvent = (event) => {
            const target = event.target;
            if (target && target.classList.contains('inputHidden')) {
                //TODO: generateVisualNN(inputInput.value, getAllHiddenLayer(), outputInput.value);
            }
        };
        this._inputScale = document.querySelector('#inputInput');
        this._hiddenLayerCount = document.querySelector('#hiddenLayerCount');
        this._outputScale = document.querySelector('#inputOutput');
        this._hiddenLayerWrapper = document.querySelector('#hiddenLayerWrapper');
        this._hiddenLayerCount.addEventListener('input', this.addHiddenLayers);
        this._hiddenLayerWrapper.addEventListener('input', this.handleInputEvent);
    }
}
//# sourceMappingURL=InputHandler.js.map