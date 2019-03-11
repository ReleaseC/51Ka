import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../services';
/**
 * Generated class for the VerifyidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifyid',
  templateUrl: 'verifyid.html',
})
export class VerifyidPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public Service: HomeService ) {
   // this.is_actived1 = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyidPage');
  }
  verify_code() {
    if (this.UserName.length > 0 && this.UserId.length > 0 ) {
      this.is_actived1 = true;
    }
    else 
    {
      this.is_actived1 = false;
    }
  }

  async Submit() {
    let moboile = await this.Service.getUserData()['data'].mobile;
    let data = await this.Service.idApprove(this.UserId ,this.UserName, moboile);
    App.ShowToast(data.msg)
  }
  

  private UserName= '';
  private UserId= '';
  private is_actived1;
  private UserTel= '';
}
