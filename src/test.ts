// const model: tf.Sequential = tf.sequential();
// model.add(tf.layers.dense({ units: 3, inputShape: [1] }));
// model.add(tf.layers.dense({ units: 2 }));
// model.add(tf.layers.dense({ units: 8 }));
// model.add(tf.layers.dense({ units: 3 }));

// // model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
// model.layers.forEach((layer, index) => {
//    console.log(`Layer ${index}:`);
   
//    // Ausgabe der Anzahl der Neuronen (Einheiten) in diesem Layer
//    const layerUnits = layer.units;
//    console.log(`Number of neurons: ${layerUnits}`);
 
//    const weights = layer.getWeights();
 
//    if (weights.length > 0) {
//      // Gewichtsmatrix
//      const weightMatrix = weights[0].arraySync();
//      console.log('Weights:', weightMatrix);
 
//      // Bias-Vektor, falls vorhanden
//      if (weights.length > 1) {
//        const biasVector = weights[1].arraySync();
//        console.log('Biases:', biasVector);
//      } else {
//        console.log('No biases for this layer');
//      }
//    } else {
//      console.log('No weights or biases for this layer');
//    }
//  });