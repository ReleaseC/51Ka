import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardmanagePage } from './cardmanage';

@NgModule({
  declarations: [
    CardmanagePage,
  ],
  imports: [
    IonicPageModule.forChild(CardmanagePage),
  ],
})
export class CardmanagePageModule {}
