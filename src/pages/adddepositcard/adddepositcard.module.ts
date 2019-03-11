import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdddepositcardPage } from './adddepositcard';

@NgModule({
  declarations: [
    AdddepositcardPage,
  ],
  imports: [
    IonicPageModule.forChild(AdddepositcardPage),
  ],
  exports: [
    AdddepositcardPage
  ]
})
export class AdddepositcardPageModule {}
