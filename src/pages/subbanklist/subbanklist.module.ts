import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubbanklistPage } from './subbanklist';

@NgModule({
  declarations: [
    SubbanklistPage,
  ],
  imports: [
    IonicPageModule.forChild(SubbanklistPage),
  ],
})
export class SubbanklistPageModule {}
