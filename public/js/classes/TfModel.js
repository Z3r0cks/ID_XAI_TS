export class TfModel {
    constructor(tfModel) {
        this._tfModel = tfModel;
    }
    get tfModel() {
        return this._tfModel;
    }
    addDenseLayers(layers) {
        layers.forEach(() => {
            // this._tfModel.add(tf.layers.dense({ layer[units]: 3 }));
        });
    }
}
//# sourceMappingURL=TfModel.js.map