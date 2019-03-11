import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../../providers/home-service';

/**
 * Generated class for the ApprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approve',
  templateUrl: 'approve.html',
})
export class ApprovePage {
  name: string;
  idnumber: string;
  isActived: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService) 
  {
    this.idnumber = '';
    this.name = '';
  }

  verify_code() {
    
    if (this.name.length > 0 && this.idnumber.length > 0 ) {
      this.isActived = true;
    }
    else 
    {
      this.isActived = false;
    }
  }

  async submit() {
    let user_data = App.userInfo;
    let mobile = user_data['mobile'];

    let return_data = await this.service.idApprove(this.idnumber, this.name, mobile);
    if (return_data['code'] == 1) {
      this.navCtrl.push('CreditcardcashbackPage');
    }
    else {
      App.ShowToast('您的身份认证未通过，请重新认证');
      this.navCtrl.push('ApprovePage');
    }

  }

  
}
