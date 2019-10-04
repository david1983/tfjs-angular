import { Component, OnInit } from '@angular/core';
import * as tf from "@tensorflow/tfjs"
import * as mobilenet from "@tensorflow-models/mobilenet"
import * as knnClassifier from "@tensorflow-models/knn-classifier"
import knnmodel from "./knn"

@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.scss']
})

export class CustomModelComponent implements OnInit {
  net: any
  clf: knnClassifier.KNNClassifier
  imgEl: any
  inputClass = ""
  classes = [
    // "montevideo antel arena",
    "montevideo mercado agricola",
    "montevideo street",
    "montevideo palacio legislativo",
    "montevideo palacio salvo",
    "montevideo teatro solis",
    "montevideo torre antel",
    "montevideo world trade center",
  ]

  imgCursor = 0
  predictions
  pred
  intervalId
  constructor() { }

  async ngOnInit() {
    // Load the model.
    this.net = await mobilenet.load();
    this.clf = knnClassifier.create();

    // Make a prediction through the model on our image.
    this.imgEl = document.getElementById('img-custom');        
    if (!this.load()) {
      this.loadJson(knnmodel)
      // this.classes.forEach(c => {
      //   [...Array(10)].map((v, id) => {
      //     const url = `assets/images/${c}/${id}.jpg`
      //     const img = new Image()
      //     img.src = url
      //     img.onload = () => this.addExample(c, img)
      //   })
      // })
    }
    this.intervalId = setInterval(() => this.classify(), 500)
  }

  addClass() {
    this.classes.push(this.inputClass)
    this.inputClass = ""
  }

  addExample(classId, img) {    
    const activation = this.net.infer(img, "conv_preds");
    this.clf.addExample(activation, classId);
  }

  save() {
    let dataset = this.clf.getClassifierDataset()
    localStorage.setItem("keys", JSON.stringify(Object.keys(dataset)))
    Object.keys(dataset).forEach((key) => {
      let data = dataset[key].dataSync();
      const arr = Array.from(data)      
      localStorage.setItem(key, JSON.stringify(arr))
    });
  }

  load() {
    //can be change to other source
    const keysStr = localStorage.getItem("keys")
    if (!keysStr) return false
    const keys = JSON.parse(keysStr)
    //covert back to tensor
    const b = {}
    const tensorObj = keys.reduce((a, key) => {
      const tensor = JSON.parse(localStorage.getItem(key))
      b[key] = tensor
      a[key] = tf.tensor(tensor, [tensor.length / 1024, 1024])
      return a
    }, {})

    console.log(JSON.stringify(b))
    this.clf.setClassifierDataset(tensorObj);
  }


  loadJson(savedModel){
      const tensorObj = Object.keys(savedModel).reduce((a, key) => {
        const tensor = savedModel[key]
        a[key] = tf.tensor(tensor, [tensor.length / 1024, 1024])
        return a
      }, {})
  
      this.clf.setClassifierDataset(tensorObj);
  }

  addSnapshot(classId) {
    const img: any = document.getElementById('img-custom');
    const activation = this.net.infer(img, "conv_preds");
    this.clf.addExample(activation, classId);
    this.save()
  }

  onDestroy(){
    clearInterval(this.intervalId)
  }

  async classify() {
    if (this.clf.getNumClasses() > 0) {
      this.imgEl = document.getElementById('img-custom');
      // Get the activation from mobilenet from the webcam.
      const activation = this.net.infer(this.imgEl, "conv_preds");
      // Get the most likely class and confidences from the classifier module.
      this.predictions = await this.clf.predictClass(activation);
      if (this.predictions.confidences[this.predictions.label] > 0.6)
        this.pred = this.predictions.label
    }
  }
}