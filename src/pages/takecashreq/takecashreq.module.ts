import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakecashreqPage } from './takecashreq';

@NgModule({
  declarations: [
    TakecashreqPage,
  ],
  imports: [
    IonicPageModule.forChild(TakecashreqPage),
  ],
  exports: [
    TakecashreqPage
  ]
})
export class TakecashreqPageModule {}
