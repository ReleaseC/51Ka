import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TAuth } from '../../providers/auth';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the FindpassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-findpassword',
  templateUrl: 'findpassword.html'
})

export class FindpasswordPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: TAuth
  ) {
    this.is_step = true;
    this.is_actived1 = false;
    this.is_actived2 = false;
    this.times = 60;
    this.send_code = 0;
    this.timer = null;
    this.is_mobile = false;
  }

  inputMobile()
  {
    if (this._phonenum.match(this.regphonenum) != null)
    {
      this.is_mobile = true;
    }
    else
    {
      this.is_mobile = false;
    }
    console.log(this._phonenum.match(this.regphonenum));
  }

  async getVerifyCode() {

    if(this._phonenum == null ||this._phonenum["length"] == 0) {
      App.ShowToast("请输入手机号");
      return;
    }
    else if(!this._phonenum.match(this.regphonenum)) {
      App.ShowToast("请输入正确的手机号");
      return;
    }
    
    let return_data = await this.auth.GetVerifyCode(this._phonenum);
    App.ShowToast(return_data["msg"]);

    // 开定时器
    this.send_code = 1;
    this.timer = setInterval(()=>{
      this.times --;
      if( this.times <= 0 ){
        clearInterval(this.timer);
        this.send_code = 0;
        this.times = 60;
        this.message = '重新获取';
      }
      console.log(this.times);
    },1000)
  }

  async toNextPage() 
  {
    let return_data = await this.auth.CheckVeriCode(this._phonenum, this._verifycode);
    if (return_data.code == 1)
    {
      this.is_step = false;
    }
    else
    {
      App.ShowToast('验证码验证失败');
    }
    
    clearInterval(this.timer);
    this.send_code = 0;
    this.times = 60;
  }

  async finished() {
    if(this._password["length"] < 6 || this._password["length"] > 22){
      App.ShowToast("密码长度不得小于6位或大于22位");
      return;
    }
    if(this._password != this._verifypassword) {
      App.ShowToast("两次输入的密码不一致");
      return;
    }else {
      let return_data = await this.auth.ChangePassword(Md5.hashStr(this._password), this._verifycode, this._phonenum);
      console.log("findpassback"+ return_data);
      if(return_data["msg"]){
        App.ShowToast(return_data["msg"]);
        this.navCtrl.push("LoginPage");
      }else{
        App.ShowToast("没有msg值");
      }
    }
  }

  get phone_num(): string {
    return this._phonenum;
  }

  set phone_num(value: string) {
    this._phonenum = value;
  }

  get verify_code(): string {
    return this._verifycode;
  }

  set verify_code(value: string) {
    this._verifycode = value;
    if (this._verifycode["length"] > 0 && this.is_mobile) {
      this.is_actived1 = true;
    }else{
      this.is_actived1 = false;
    }
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get verify_password(): string {
    return this._verifypassword;
  }

  set verify_password(value: string) {
    this._verifypassword = value;
    if (this._verifypassword["length"] > 0) {
      this.is_actived2 = true;
    }else{
      this.is_actived2 = false;
    }
  }

  private _phonenum: string;
  private regphonenum = /^1[3|4|5|7|8][0-9]{9}$/;
  private _verifycode: string;
  private is_step: boolean;
  private is_actived1: boolean;
  private is_actived2: boolean;
  private _password: string;
  private _verifypassword: string;
  private send_code: number;
  private times: number;
  private timer: any;
  private is_mobile: boolean;
  private message: string = '获取验证码';
}
