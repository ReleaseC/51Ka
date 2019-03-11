import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../services';
/**
 * Generated class for the AddcreditcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addcreditcard',
  templateUrl: 'addcreditcard.html'
})
export class AddcreditcardPage {
  user_info: any;
  name: string;
  idcard: string;
  id_number: string;
  card_num: number;
  user_mobile: number;
  mobile: number;
  verify_code: string;
  is_input: boolean;
  allow_getcode: boolean;
  regphonenum = /^1[3|4|5|7|8][0-9]{9}$/;
  timer: any;
  send_code: number;
  times: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService ) 
  { 
    this.name = "";
    this.idcard = "";
    this.card_num = null;
    this.mobile = null;
    this.verify_code = '';
    this.is_input = false;
    this.allow_getcode = false;
    this.timer = null;
    this.send_code = 0;
    this.times = 60;

    this.Refresh();
  }

  async Refresh()
  {
    this.user_info = App.userInfo;   
    this.user_mobile = this.user_info.mobile;      
    this.name = this.user_info.name;
    this.id_number = this.user_info.idCardNo;

    this.ChangeIds(this.id_number);
  }

  ChangeIds(value)
  {
    this.idcard = value;
    let tmp_str = '';
    for (let i = 6; i < this.idcard.length - 4; i++){
      tmp_str += '*';
    }
    this.idcard = this.idcard.substr(0,6) + tmp_str + this.idcard.substr(-4);
  }

  isInput() 
  {
    if (this.verify_code.length > 0 && this.mobile && this.card_num)
    {
      this.is_input = true;
    }
    else
    {
      this.is_input = false;
    }
  }

  getMobile()
  {
    if (this.mobile.toString().match(this.regphonenum) && this.card_num.toString().length > 15 )
    {
      this.allow_getcode = true;
    }
    else
    {
      this.allow_getcode = false;
    }
  }

  async sendCode() 
  {
    let tmp_vericode = await this.service.getVeriCode(this.user_mobile);
    if(tmp_vericode.code == 1)
    {
      App.ShowToast('验证码发送成功');
      // 开定时器
      this.send_code = 1;
      this.timer = setInterval(()=>{
        this.times --;
        if( this.times <= 0 ){
          clearInterval(this.timer);
          this.send_code = 0;
          this.times = 60;
      }
      console.log(this.times);
    },1000)
    }
    else
    {
      App.ShowToast('验证码发送失败，请稍后再试');
      return;
    }
  }

  async save() 
  {
    let return_data = await this.service.confirmVeriCode(this.user_mobile, this.verify_code);
    // 此处code应为1
    if(return_data.code == 1)
    {
      clearInterval(this.timer);
      this.send_code = 0;
      this.times = 60;
      let addcard = await this.service.addCreditCard(this.card_num, this.mobile);
      if(addcard['code'] == 1)
      {
        App.ShowToast('信用卡添加成功');
        this.navCtrl.push('CreditcardcashbackPage');
      }
      else
      {
        App.ShowToast('信用卡添加失败，请稍后再试');
        return;
      }
    }
    else
    {
      App.ShowToast('验证码输入错误');
      return;
    }
  }
}
