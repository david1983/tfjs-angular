import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  //<<<< import it here
import { AppRoutingModule } from './app-routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { TensorsComponent } from './tensors/tensors.component';
import { FitCurveComponent } from './fit-curve/fit-curve.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToxicComponent } from './toxic/toxic.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {DemoMaterialModule} from './material-module';
import { Ml5ImageClassificationComponent } from './ml5-image-classification/ml5-image-classification.component';
import { Ml5VideoClassificationComponent } from './ml5-video-classification/ml5-video-classification.component';
import { CustomModelComponent } from './custom-model/custom-model.component';

@NgModule({
  declarations: [
    AppComponent,
    TensorsComponent,
    FitCurveComponent,
    ToxicComponent,
    ToolbarComponent,
    Ml5ImageClassificationComponent,
    Ml5VideoClassificationComponent,
    CustomModelComponent
  ],
  imports: [
    MatNativeDateModule,
    DemoMaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
