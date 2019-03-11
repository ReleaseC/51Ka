import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../services';
/**
 * Generated class for the AdddepositcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adddepositcard',
  templateUrl: 'adddepositcard.html',
})
export class AdddepositcardPage {
  user_info: any;
  name: string;
  idcard: string;
  mobile: number;
  card_num: number;
  bank_phone: number;
  bank_name: string = '选择银行';
  bank_num: string = '';
  key_word: string;
  checked_bank: string;
  is_input: boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService) 
  {
    this.name = "";
    this.idcard = "";
    this.card_num = null;
    this.bank_phone = null;
    this.key_word = '';
    this.is_input = false;
    this.Refresh();
    App.event.subscribe((value) => this.SetBank(value));
  }

  SetBank(event)
  {
    console.log(event);
    if (event.event_name == "selected_bank")
    {
      this.bank_name = event.value;
    }
    else if (event.event_name == "selected_subbank") {
      console.log(event.value);
      this.key_word = event.value.name;
      this.bank_num = event.value.bankCode;
      
    }
    console.log(this.bank_name);
  }

  async Refresh()
  {
    this.user_info = App.userInfo;   
    this.mobile = this.user_info.mobile;      
    this.name =this.user_info.name;
    this.idcard = this.user_info.idCardNo;

    this.ChangeIds(this.idcard);
  }

  ChangeIds(value)
  {
    console.log("id number:" + value);
    this.idcard = value;
    let tmp_str = '';
    for (let i = 6; i < this.idcard.length - 4; i++){
      tmp_str += '*';
    }

    this.idcard = this.idcard.substr(0,6) + tmp_str + this.idcard.substr(-4);
  }

  choseBank() 
  {
    this.navCtrl.push('BanklistPage');
  }

  async searchBank()
  {
    console.log("search bank");
    if (this.bank_name == '选择银行')
    {
      App.ShowToast('请先选择银行');
    }
    else
    {
      this.navCtrl.push('SubbanklistPage',{
        bank_name: this.bank_name,  
        key_word: this.key_word
      });
    }
  }

  isInput() 
  {
    if(this.key_word.length > 0 && this.bank_phone && this.card_num)
    {
      this.is_input = true;
    }
    else
    {
      this.is_input = false;
    }
  }

  async save()
  {
    let result = await this.service.addDepositCard(
      this.card_num, 
      this.bank_name, 
      this.bank_num, 
      this.key_word, 
      this.bank_phone
    );
    if (result.code == 1) 
    {
      App.ShowToast('储蓄卡添加成功');
      this.navCtrl.push('CreditcardcashbackPage');
    }
    else
    {
      App.ShowToast(result.msg);
    }
  }

}
