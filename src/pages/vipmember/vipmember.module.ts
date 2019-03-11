import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VipmemberPage } from './vipmember';

@NgModule({
  declarations: [
    VipmemberPage,
  ],
  imports: [
    IonicPageModule.forChild(VipmemberPage),
  ],
})
export class VipmemberPageModule {}
