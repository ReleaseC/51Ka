import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NickPage } from './nick';

@NgModule({
  declarations: [
    NickPage,
  ],
  imports: [
    IonicPageModule.forChild(NickPage),
  ],
})
export class NickPageModule {}
