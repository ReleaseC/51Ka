import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecashnotePage } from './recashnote';

@NgModule({
  declarations: [
    RecashnotePage,
  ],
  imports: [
    IonicPageModule.forChild(RecashnotePage),
  ],
  exports: [
    RecashnotePage
  ]
})
export class RecashnotePageModule {}
