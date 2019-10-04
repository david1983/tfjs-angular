import { Injectable } from '@angular/core';

// there is currently a bug on the ml5 library on npm
// ml5 has been included in the index.html file
// here we redefine the window interface to include ml5

declare global {
  interface Window { ml5: any; }
}

const {ml5} = window

@Injectable({
  providedIn: 'root'
})
export class ImageClassifierService {
  classifier
  predictions = ""
  
  images = [
    "assets/image-clf.jpg",
    "assets/magpie.jpg",
    "assets/cat.jpg",
    "assets/tiger.jpg",
    "assets/cheetah.jpg",
    "assets/elephant.jpg",
    "assets/grape.jpg",
    "assets/mountain.jpg",
    "assets/camera.jpg"
  ]
  currentImage=0
  imageUrl = this.images[this.currentImage]

  loaded = false
  constructor() { 
    // Initialize the Image Classifier method with MobileNet
    this.classifier = ml5.imageClassifier('MobileNet', () => this.loaded = true)    
  }

  nextImage(){    
    // cycle through the images if image is last set cursor to 0
    this.currentImage = (this.currentImage==this.images.length-1) ? 0 : this.currentImage+1
    this.imageUrl = this.images[this.currentImage]
    // create a new image and load the current url in src
    var img = new Image();
    img.src = this.imageUrl
    // trigger the classification when the image is loaded
    img.onload = () => this.classify(img)
    
  }

  classify(image){
    this.classifier.predict(image,(err, results)  => {        
      if(!results) return  
      this.predictions = results.map(pred => {
        pred.probability = (pred.probability*100).toFixed(2)
        return pred
      })
    })
  }

   
}
