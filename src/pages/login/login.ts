import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { TAuth } from '../../providers/auth';
import { Md5 } from 'ts-md5/dist/md5';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage extends TCommonPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public auth: TAuth
  ) 
  {
    super(navCtrl, navParams, loadingCtrl, toastCtrl);
  }

  async Login() 
  {
    if (this._phonenum == null) {
      this.ShowToast('手机号码不能为空');
      return;
    }

    if (this._password == null) {
      this.ShowToast('请输入密码');
      return;
    }
    

    let data = await this.auth.Login(this._phonenum, Md5.hashStr(this._password));
    
    if (data["code"] == 1) {
      localStorage.setItem('token', data.data.token);
      
      this.auth.getUserData();      
      this.navCtrl.push(TabsPage);
    }
    else {
      App.ShowToast(data["msg"]);
    }

  }

  ToFindPassword() {
    this.navCtrl.push('FindpasswordPage');
  }

  get phoneNum(): number {
    return this._phonenum;
  }

  set phoneNum(value: number) {
    this._phonenum = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _phonenum: number;
  private _password: string;
}
