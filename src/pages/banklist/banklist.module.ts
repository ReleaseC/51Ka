import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BanklistPage } from './banklist';

@NgModule({
  declarations: [
    BanklistPage,
  ],
  imports: [
    IonicPageModule.forChild(BanklistPage),
  ],
})
export class BanklistPageModule {}
