import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TensorsComponent } from "./tensors/tensors.component"
import { FitCurveComponent } from "./fit-curve/fit-curve.component"
import { ToxicComponent } from "./toxic/toxic.component"
import { Ml5ImageClassificationComponent } from "./ml5-image-classification/ml5-image-classification.component"
import { Ml5VideoClassificationComponent } from "./ml5-video-classification/ml5-video-classification.component"
import { CustomModelComponent } from "./custom-model/custom-model.component"
export const routes: Routes = [
  { path: '', component: TensorsComponent },
  { path: 'tensors', component: TensorsComponent },
  { path: 'fit', component: FitCurveComponent },
  { path: 'toxic', component: ToxicComponent },
  { path: 'ml5/image-clf', component: Ml5ImageClassificationComponent },
  { path: 'ml5/video-clf', component: Ml5VideoClassificationComponent },
  { path: 'custom', component: CustomModelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
