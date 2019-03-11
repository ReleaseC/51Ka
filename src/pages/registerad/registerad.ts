import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisteradPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerad',
  templateUrl: 'registerad.html',
})
export class RegisteradPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisteradPage');
  }
  ToRes(){
    this.navCtrl.push('RegisterPage')
  }
  ToLogin(){
    this.navCtrl.push('LoginPage')
  }
}
