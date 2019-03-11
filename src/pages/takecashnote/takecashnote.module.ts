import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakecashnotePage } from './takecashnote';

@NgModule({
  declarations: [
    TakecashnotePage,
  ],
  imports: [
    IonicPageModule.forChild(TakecashnotePage),
  ],
  exports: [
    TakecashnotePage
  ]
})
export class TakecashnotePageModule {}
