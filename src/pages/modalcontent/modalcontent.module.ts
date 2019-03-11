import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalcontentPage } from './modalcontent';

@NgModule({
  declarations: [
    ModalcontentPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalcontentPage),
  ],
  exports: [
    ModalcontentPage
  ]
})
export class ModalcontentPageModule {}
