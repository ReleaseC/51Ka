import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TAuth } from '../../providers/auth';
import { MineService } from '../../providers/mine-service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: TAuth,
    public service: MineService
  ) {
    this.is_step = true;
    this.is_actived1 = false;
    this.is_actived2 = false;
    this.times = 60;
    this.send_code = 0;
    this.timer = null;
  }

  async ngOnInit(){
    this._phonenum = await this.service.GetUserData();
    this.phone_num = this._phonenum['data'].mobile.substr(0,3) + "****" + this._phonenum['data'].mobile.substr(-4);
  }

  async getVerifyCode() {
    let tmpcode = await this.service.GetVerifyCode(this._phonenum);
    console.log(tmpcode);
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

  async toNextPage() 
  {
    let return_data = await this.service.confirmVeriCode(this._phonenum, this.verify_code);
    console.log(return_data);
    if (return_data.code == 1)
    {
      this.is_step = false;
    }
    else
    {
      App.ShowToast('验证码验证失败');
      return
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
      App.ShowToast("密码输入不一致，请重新输入");
      return;
    }else {
      let return_data = await this.auth.ChangePassword(Md5.hashStr(this._password),this._verifycode, this._phonenum);
      console.log("findpassword: ");
      console.log(return_data);
      if(return_data.code != 1){
        App.ShowToast("密码修改失败，请稍后重试");
      }
    }
  }
  get verify_code(): string {
    return this._verifycode;
  }

  set verify_code(value: string) {
    this._verifycode = value;
    if (this._verifycode["length"] > 0) {
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

  private phone_num: string;
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

}
