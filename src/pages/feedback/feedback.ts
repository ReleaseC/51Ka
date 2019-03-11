import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  _text: string;
  isInput: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isInput = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  get text(): string{
    return this._text;
  }

  set text(value: string){
    if(value.length >= 1){
      this.isInput = true;
    }else{
      this.isInput = false;
    }
  }

}
