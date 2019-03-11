import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalcontentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modalcontent',
  templateUrl: 'modalcontent.html',
})
export class ModalcontentPage {
  banks: any;
  bank_type: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public platform: Platform
  ) {
    let all_banks = navParams.get('data');
    this.bank_type = navParams.get('type');
    let show_bank = navParams.get('show_bank');
    this.banks = [];
    // 在此处匹配银行logo
    for(let i=0; i<all_banks.length; i++){
      if(all_banks[i].type == this.bank_type){
        let tmp_bank = all_banks[i];
        console.log(tmp_bank);
        tmp_bank.show_name = all_banks[i].bank+"("+all_banks[i].cardNo+")";
        tmp_bank.check = tmp_bank.show_name == show_bank ? true : false;
        this.banks.push(tmp_bank);
      }
    }
    console.log(this.banks);
  }

  dismiss(){
    let data;
    for(let i=0;i<this.banks.length;i++){
      if(this.banks[i].check == true){
        data = { 
          bank_name: this.banks[i].show_name,
          type: this.bank_type
         };
      }
    }
    console.log(data);
    this.viewCtrl.dismiss(data);
  }
  
  choseBank(ind){
    for(let i=0; i<this.banks.length; i++) {
      if(i != ind) {
        console.log(i);
        this.banks[i].check = false;
      }
    }
    this.banks[ind].check = true;
    this.dismiss();
  }

  toAddNewCard(num){
    switch(num){
      case 0:
      this.navCtrl.push('AddcreditcardPage');
      break;
      case 1:
      this.navCtrl.push('AdddepositcardPage');
      break;
    }
  }

}