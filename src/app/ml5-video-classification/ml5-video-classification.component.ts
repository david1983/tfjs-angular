import { Component, OnInit } from '@angular/core';
import { ImageClassifierService } from "../image-classifier.service"

@Component({
  selector: 'app-ml5-video-classification',
  templateUrl: './ml5-video-classification.component.html',
  styleUrls: ['./ml5-video-classification.component.scss']
})
export class Ml5VideoClassificationComponent implements OnInit {
  intervalId = null
  constructor(
    private imageClf: ImageClassifierService
  ) { }

  /**
   * on component mount start the classification of the video
   */
  ngOnInit() {
    const video:any = document.getElementById("ml5-video")    
    video.muted = true
    this.intervalId = setInterval(() => {
      // create a canvas to get a snapshot of the video
      var canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // create an image from the canvas
      var img = new Image();
      img.src = canvas.toDataURL();
      // classify the snapshot
      img.onload = () => this.imageClf.classify(img)      
    }, 1000)
    // clear the interval when the video stop
    video.onended = () => clearInterval(this.intervalId)
  }

  /**
   * destroy the interval for the classification
   */
  ngOnDestroy(){    
    // clear the interval when the component is destroyed
    clearInterval(this.intervalId)
  }
}
