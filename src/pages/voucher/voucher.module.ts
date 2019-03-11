import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherPage } from './voucher';

@NgModule({
  declarations: [
    VoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(VoucherPage),
  ],
})
export class VoucherPageModule {}
