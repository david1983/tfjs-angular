import { Component, OnInit } from '@angular/core';
import {ImageClassifierService} from "../image-classifier.service"

@Component({
  selector: 'app-ml5-image-classification',
  templateUrl: './ml5-image-classification.component.html',
  styleUrls: ['./ml5-image-classification.component.scss']
})
export class Ml5ImageClassificationComponent implements OnInit {
  
  constructor(
    private imageClf: ImageClassifierService
  ) { }

  public nextImage(){
    this.imageClf.nextImage()
  }

  ngOnInit() {
    const imageElem = document.getElementById("ml5-image")
    this.imageClf.classify(imageElem)
  }

}
