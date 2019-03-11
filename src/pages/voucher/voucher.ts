import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';

@IonicPage()
@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
})
export class VoucherPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public serve:MineService) {
    this.OnInitVouchers(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoucherPage');
  }

  async OnInitVouchers() {
    let data = await this.serve.GetVoucherList()
   
    this.Vouchers = data.data;
  }

  VoucherClass(index) {
    if (index%4 == 0) {
      return 'stamp01'
    } 
    else if (index%4 == 1) {
      return 'stamp02'
    }
    else if (index%4 == 2) {
      return 'stamp03'
    }
    else if (index%4 == 3){
      return 'stamp04'
    }
  }

  private Vouchers=[];
  private i;
}
