import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
/**
 * Generated class for the RecashnotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recashnote',
  templateUrl: 'recashnote.html',
})
export class RecashnotePage {
  reCashDatas: any;
  data_list: any;
  user_data: any;
  total_amount: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: MineService
  ) {
    this.user_data = App.userInfo;
    this.total_amount = 0;
    this.refresh();
  }

  async refresh()
  {
    let return_data = await this.service.GetReCashList();
    console.log(return_data);
    return_data = {
      "code":1,
      "msg":"成功",
      "data":[
        {
          "amount":400,
          "type":1,
          "time":"2017-11-07 15:30",
          "remark":"抵扣券入账"
        },
        {
          "amount":800,
          "type":1,
          "time":"2017-11-07 15:30",
          "remark":"抵扣券入账"
        },
        {
          "amount":800,
          "type":2,
          "time":"2017-11-07 15:30",
          "remark":"提现申请"
        }
      ]}
    if(return_data.code == 1){
      this.data_list = return_data.data;
      for(let i = 0; i < this.data_list.length; i++){
        this.total_amount += this.data_list[i].amount;
      }
    }
  }

  openTakeCash() {
    if (this.user_data.idCardNo != null && this.user_data.depositCards > 0)
    {
      this.navCtrl.push('CreditcardcashbackPage');
    }
    else{
      let myModal = this.modalCtrl.create('TakecashreqPage');
      myModal.present();
    }
    
  }

}
