import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanPage } from './loan';

@NgModule({
  declarations: [
    LoanPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanPage),
  ],
})
export class LoanPageModule {}
