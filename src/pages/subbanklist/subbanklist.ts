import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../../providers/home-service';
import { getNavFromNavGroup } from 'ionic-angular/navigation/url-serializer';
/**
 * Generated class for the SubbanklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subbanklist',
  templateUrl: 'subbanklist.html',
})
export class SubbanklistPage {
  bank_list: any;
  bank_name: string;
  key_word: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService
  ) 
  {
    this.bank_name = this.navParams.get('bank_name');
    this.key_word = this.navParams.get('key_word');

    this.getSubBankList();
  }
  
  async getSubBankList()
  {
    let return_data = await this.service.getSubBankList(this.bank_name, this.key_word);
    if (return_data.code == 1)
    {
      this.bank_list = return_data.data;
    }
    else
    {
      this.bank_list = []
    }
  }

  choseBank(name, bankCode)
  {
    let data = {"event_name": 'selected_subbank', "value": {"name": name, "bankCode": bankCode}};
    App.event.emit(data);

    this.navCtrl.pop();    
  }
}

