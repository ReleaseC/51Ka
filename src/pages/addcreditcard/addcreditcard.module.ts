import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcreditcardPage } from './addcreditcard';

@NgModule({
  declarations: [
    AddcreditcardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcreditcardPage),
  ],
  exports: [
    AddcreditcardPage
  ]
})
export class AddcreditcardPageModule {}
