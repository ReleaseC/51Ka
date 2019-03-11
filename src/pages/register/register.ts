import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TAuth } from '../../providers/auth';
import { Md5 } from "ts-md5/dist/md5";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: TAuth
  ) {
  }

  times() {
    this.valid_num = 60;
    this.timer = setInterval(() => {
      if (this.valid_num > 0) {
         this.changeCount();
      }
      return
    }, 1000);
  }

  changeCount() {
    this.valid_num--;
    if (this.valid_num == 0){
      this.valid_text = "重新获取";
      this.authflag = 0;
      clearInterval(this.timer)
      return
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //判断是否需要使用倒计时
  async GetAuthCode() {
    if (this.myTel == "")
      return App.ShowToast("手机号不能为空");

    if (!this.myTel.match(this.regtel))
      return App.ShowToast("请输入正确的手机号");

    if (this.authflag = 1) {
      this.times();
      let result = await this.auth.GetVerifyCode(this.myTel);
      if ( result.code == 1) {
      //  /this.authcode = result.data;
      //   this.authcode = '1234';
        return App.ShowToast("发送成功")
      }
      else {
        return App.ShowToast("发送失败")
      }
    }
  }

  async ToNext() {
    if (this.myTel == "")
      return App.ShowToast("手机号不能为空");

    if (!this.myTel.match(this.regtel))
      return App.ShowToast("请输入正确的手机号");

    if (this.myCode == "")
      return App.ShowToast("验证码不能为空");
    
    let result = await this.auth.CheckVerifyCode(this.myTel,this.myCode);
    if (result.code == 1) {
      App.ShowToast("验证成功");
      this.regIndex = 1;
    }
    else {
      App.ShowToast(result.msg)
      this.regIndex = 0;
    }
  }

  async ToResgister() {
    if (this.myPassWord != this.CheckmyPassWord) {
      return App.ShowToast("两次输入的密码不一致")
    }

    if (this.myPassWord.length<6 && this.myPassWord.length>22) {
      return App.ShowToast("密码长度请在6-22之间")
    }

    let md5paddword = Md5.hashStr(this.myPassWord); 
    let result = await this.auth.RegisterUser(this.myTel,this.myCode,md5paddword);
    switch(result.code) {
      case 0 : return App.ShowToast("注册失败");
      case 1 : {
        this.navCtrl.push('LoginPage');
        App.ShowToast("注册成功");
        return
      }
      case 2 : return App.ShowToast("超时,稍后重试");
    }
  }
  Back() {
    this.regIndex = 0;
  }

  Check() {
    if(this.myPassWord.length>0 && this.CheckmyPassWord.length>0) {
      this.regbtnFlag = true;
    }
    else {
      this.regbtnFlag = false;
    }
  }

  private valid_num;
  private num:number;
  private authflag = 0;
  private valid_text = "获取验证码"
  private myTel = '';
  private myCode = '';
  private myPassWord = '';
  private CheckmyPassWord = '';
  private regtel = /^1[3|4|5|7|8][0-9]{9}$/;
  private regIndex = 0;
  private timer;
  private regbtnFlag = false;
}
