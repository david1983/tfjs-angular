import { Component, OnInit } from '@angular/core';
import * as tf from "@tensorflow/tfjs"

declare global {
  interface Window { Plotly: any; }
}

const { Plotly } = window
const datasetLen = 500

@Component({
  selector: 'app-fit-curve',
  templateUrl: './fit-curve.component.html',
  styleUrls: ['./fit-curve.component.scss']
})
export class FitCurveComponent implements OnInit {
  model: tf.Sequential
  tensorData
  x = [...Array(datasetLen)].map((i, k) => k-(datasetLen/3))
  y = [...Array(datasetLen)].map((i, k) => this.fn(k-(datasetLen/3)) + Math.random() * 10000)
  preds = []
  plot
  trainId = null
  constructor() { }

  ngOnInit() {}

  drawPlotly() {
    const elem = document.getElementById("chart")

    var trace1 = {
      x: this.x,
      y: this.y,
      mode: 'markers',
      type: 'scatter'
    };


    var data = [trace1];

    if (this.preds.length > 0) {
      data = data.concat(this.preds.map(pred => {
        return {
          x: [...Array(datasetLen)].map((i, k) => pred.x[k]),
          y: [...Array(datasetLen)].map((i, k) => pred.y[k]),
          mode: "markers",
          type: "scatter"
        }
      }))

    }
    console.log(data)
    Plotly.purge(elem)
    this.plot = Plotly.newPlot(elem, data)

  }

  ngAfterViewInit() {
    this.drawPlotly()
    this.tensorData = this.convertToTensor(this.x, this.y)
    // this.train()

  }

  startTraining(){
    this.trainId = setInterval(() => this.train(), 500)
  }

  stopTraining(){
    clearInterval(this.trainId)
  }

  train() {
        
    const { model, tensorData } = this
    return model.fit(tensorData.inputs, tensorData.labels, { batchSize: 100, epochs: 10, shuffle: true })
      .then(() => {
        
        const result = model.evaluate(tensorData.inputs, tensorData.labels).toString()        
        const preds:any = model.predict(tensorData.inputs)

        const unNormXs = tensorData.inputs
          .mul(tensorData.inputMax.sub(tensorData.inputMin))
          .add(tensorData.inputMin);

        const unNormPreds = preds
          .mul(tensorData.labelMax.sub(tensorData.labelMin))
          .add(tensorData.labelMin);
        this.preds = []
        this.preds.push({
          x: unNormXs.dataSync(),
          y: unNormPreds.dataSync()
        })        
        this.drawPlotly()
      })



  }

  fn(x) {
    const a = 5
    const b = 0
    const c = 0
    return  a * (x ** 2) + b * x + c
  }

  initModel(): tf.Sequential {
    const model = tf.sequential()
    model.add(tf.layers.dense({ inputShape: [1], units: 50,activation:"sigmoid"}))
    // Add an output layer    
    model.add(tf.layers.dense({ units: 50,activation:"selu"}))
    model.add(tf.layers.dense({ units: 50,activation:"sigmoid"}))
    model.add(tf.layers.dense({ units: 1, useBias: true ,activation:"sigmoid"}));
    model.summary()

    model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
      metrics: ['accuracy'],
    });

    this.model = model
    return model
  }

  convertToTensor(x, y) {
    // Wrapping these calculations in a tidy will dispose any 
    // intermediate tensors.

    return tf.tidy(() => {
      // Step 1. Shuffle the data    


      // Step 2. Convert data to Tensor
      const inputs = x
      const labels = y

      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

      //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();

      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        // Return the min/max bounds so we can use them later.
        inputMax,
        inputMin,
        labelMax,
        labelMin,
      }
    });
  }

}
