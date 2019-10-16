import { Component, OnInit } from '@angular/core';
import * as tf from "@tensorflow/tfjs"
import * as mobilenet from "@tensorflow-models/mobilenet"
import * as knnClassifier from "@tensorflow-models/knn-classifier"

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {

  net
  clf
  intervalId
  predictions
  pred

  classes = [
    "No detection",
    "Mate",
    "Thermos",
  ]

  constructor() { }

  async ngOnInit() {
    this.net = await mobilenet.load();
    this.clf = knnClassifier.create();
    // Make a prediction through the model on our image.
    await this.setupWebcam()
    this.intervalId = setInterval(() => this.classify(), 500)
  }

  async classify() {
    if (this.clf.getNumClasses() > 0) {
      const imgEl = document.getElementById('img-custom');
      // Get the activation from mobilenet from the webcam.
      const activation = this.net.infer(imgEl, "conv_preds");
      // Get the most likely class and confidences from the classifier module.
      this.predictions = await this.clf.predictClass(activation);
      if (this.predictions.confidences[this.predictions.label] > 0.6)
        this.pred = this.predictions.label
    }
  }

  async setupWebcam() {  
    const imgEl:any = document.getElementById('img-custom');
    return new Promise((resolve, reject) => {
      const navigatorAny:any = navigator;
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia ||
        navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: true },
          stream => {
            imgEl.srcObject = stream;
            imgEl.addEventListener("loadeddata", () => resolve(), false);
          },
          error => reject()
        );
      } else {
        reject();
      }
    });
  }

  addSnapshot(classId){
    const img:any = document.getElementById('img-custom');
    const activation = this.net.infer(img, "conv_preds");
    this.clf.addExample(activation, classId);
  }

}
