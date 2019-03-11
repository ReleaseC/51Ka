import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MineService } from '../../providers/mine-service';

/**
 * Generated class for the TakecashreqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-takecashreq',
  templateUrl: 'takecashreq.html',
})
export class TakecashreqPage {
  user_data: any;
  id_approve: boolean;
  bind_card: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public service: MineService,
    public alertCtrl: AlertController
  ) {
    this.user_data = App.userInfo;

    if(this.user_data){
      if (this.user_data.idCardNo != null) 
      {
        this.id_approve = true;
      }
      else{
        this.id_approve = false;
      }

      if(this.user_data.depositCards > 0) {
        this.bind_card = true;
      }
      else{
        this.bind_card = false;
      }

    }
  }

  toIdApprove() {
    this.navCtrl.push('ApprovePage');
  }

  toCardBind() {
    console.log(this.id_approve);
    if(this.id_approve != true) {
      this.showAlert();
      return
    }
    this.navCtrl.push('AdddepositcardPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      message: '请先完成身份认证',
      cssClass: 'alert_ticket',
      buttons: ['OK']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
