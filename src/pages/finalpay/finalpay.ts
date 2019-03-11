import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {NgForm} from '@angular/forms';

/**
 * Generated class for the FinalpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finalpay',
  templateUrl: 'finalpay.html',
})
export class FinalpayPage {
  action: string;
  value: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer) 
  {
    let bodyText = this.navParams.get('innerHtml');    
    console.log(bodyText);
    if (bodyText !== undefined)
    {
      let _action = bodyText.split('action="')[1].split('"')[0];
      this.action = _action;
      console.log(this.action);
      let _value = bodyText.split('value="')[1].split('"')[0];
      this.value = _value;
      console.log(this.value);
    }        
  }

  ionViewDidEnter()
  {
     document.all['pay_form'].submit();
  }




}
