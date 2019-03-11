import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeService } from '../services';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ConfirmpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmpay',
  templateUrl: 'confirmpay.html',
})
export class ConfirmpayPage {
  amount: number;
  paycard: string;
  comecard: string;
  paycardId: string;
  comecardId: string;
  discount: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService,
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    private iab: InAppBrowser
  ) {
    this.amount = navParams.get("amount");
    this.paycard = navParams.get("paycard");
    this.comecard = navParams.get("comecard");
    this.paycardId = navParams.get("paycardId");
    this.comecardId = navParams.get("comecardId");
    this.discount = navParams.get("discount");

    console.log(this.amount, this.paycard, this.comecard, this.discount, this.comecardId, this.paycardId);
  }

  showTicket() 
  {
    let return_data = this.getDiscount(this.amount);
    if (return_data['data'] && return_data['data'].status == 1 )
    {
      let confirm = this.alertCtrl.create({
        message: "您有一张{{return_data['data'].amount}}元返现券可以使用，是否使用？",
        cssClass: 'alert_ticket',
        buttons: [
          {
            text: '取消',
            handler: () => {}
          },
          {
            text: '确认',
            handler: () => {
              this.pay(return_data['data'].cashbackId);
            }
          }
        ]
      });
      confirm.present();
    }
    else
    {
      this.pay();
    }
  }

  async getDiscount(amount)
  {
    let return_data = await this.service.getDiscount(this.amount);
    console.log(return_data);
    return return_data;
  }

  async pay(discount?)
  {
    let amount = this.amount * 100;
    let return_data = await this.service.tackCash(
      this.paycardId, 
      this.comecardId,
      amount,
      discount
    );   
    console.log(return_data);
    
    if (return_data)
    {
      // console.log(return_data);
      this.navCtrl.push('FinalpayPage', {innerHtml: return_data});
      // this.assembleHTML = this.sanitizer.bypassSecurityTrustHtml(return_data);
      // document.write(return_data);
    }

    // if(!return_data) {
    //   const browser = this.iab.create('http://unpay.78mi.cn/web/ApiErrorP.html','_self',{location:'no'}); 
    // }
   
  }
  
  
}
