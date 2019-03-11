import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
/**
 * Generated class for the InvalidvoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invalidvoucher',
  templateUrl: 'invalidvoucher.html',
})
export class InvalidvoucherPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public serve:MineService) {
    this.OnInitVouchers(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvalidvoucherPage');
  }

  async OnInitVouchers() {
    let data = await this.serve.GetVoucherList()
    console.log(data);
    data = {
      "code":1,
      "msg":"成功",
      "data":[{"name":"任意取现满6000可用","expireDate":"2017-12-01","source":"来自邀请奖励","amount":600,"status":"1"}]
    }
    this.Vouchers = data.data;
  }

  private Vouchers=[];
}
