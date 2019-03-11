import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nick',
  templateUrl: 'nick.html',
})
export class NickPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NickPage');
  }
  Back(){
   // let data = { 'nickname': this.nickname };
    this.viewCtrl.dismiss();
    //console.log(this.nickname)
  }
  BackSave(){
    let data = { 'nickname': this.nickname };
    this.viewCtrl.dismiss(data);
    console.log(this.nickname)
    // this.navCtrl.push('MinedetailPage');
  }
  private nickname;
}
