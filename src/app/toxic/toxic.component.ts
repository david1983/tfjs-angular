import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToxicService } from "../toxic.service"



const codeExample = `
import { Injectable } from '@angular/core';
// include the toxicity model from tfjs-models
import * as toxicity from "@tensorflow-models/toxicity"

/**
 * ToxicService provides access to the Toxicity classifier 
 */
@Injectable({
  providedIn: 'root'
})
export class ToxicService {
  tox: toxicity.ToxicityClassifier // the instance of the classifier
  loaded = false // true when the model is loaded
  classification = "" // the result of the classification
  predictions = {} // the predictions returned from the classifier
  threshold = .7 // the threshold we want to initialise the model with
  
  /**
   * load the model during service instantiation
   */
  constructor() {
    this.loadModel()
  }

  /**
   * set the threshold to a new value
   * @param newThreshold number
   */
  setThreshold(newThreshold: number){
    this.threshold = newThreshold    
  }

  /**
   * Load the Toxicity classifier
   */
  loadModel() {
    console.log("loading model")    
    // ["identity_attack", "insult", "obscene", "severe_toxicity", "threat", "toxicity"]
    const labels = ["identity_attack", "insult", "obscene", "severe_toxicity", "threat"]
    toxicity
      .load(this.threshold, labels)
      .then(model => {
        this.tox = model
        this.loaded = true
        console.log("model loaded")
      })
      .catch(console.error)
  }

  /**
   * Analyze a string using the classifier
   * @param inputValue string
   * @returns Promise<{
    predictions: Array<{
      label: string;
      results: Array<{
          probabilities: Float32Array;
          match: boolean;
      }>
    }>,
    classification: string
  }>
   */
  analyze(inputValue): Promise<{
    predictions: Array<{
      label: string;
      results: Array<{
          probabilities: Float32Array;
          match: boolean;
      }>
    }>,
    classification: string
  }>{
    if (!this.loaded) return Promise.reject("toxicity is not loaded")
    return this.tox
      .classify(inputValue)
      .then(predictions => {
        this.predictions = predictions
        const classification = predictions
          .reduce((a, i) => (i.results[0].match) ? i.label : a, "Ok comment")
        this.classification = classification
        
        return Promise.resolve({classification, predictions})
      })
      .catch(error => Promise.reject("error"))
      
  }
}
`


@Component({
  selector: 'app-toxic',
  templateUrl: './toxic.component.html',
  styleUrls: ['./toxic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToxicComponent implements OnInit {
  
  inputValue=""  
  example = codeExample
  classification = ""
  constructor(
    private cdRef: ChangeDetectorRef, 
    private toxic: ToxicService,    
  ) { 
    this.inputValue = "";
    
  }

  public async onInputupdate(inputValue: string){
    
    this.inputValue = inputValue;                
    const result = await this.toxic.analyze(inputValue)
    this.classification = this.toxic.classification
    this.cdRef.detectChanges();
  }

  ngOnInit(){}

}

