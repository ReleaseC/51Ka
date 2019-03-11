import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindpasswordPage } from './findpassword';

@NgModule({
  declarations: [
    FindpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(FindpasswordPage),
  ],
  exports: [
    FindpasswordPage
  ]
})
export class FindpasswordPageModule {}
