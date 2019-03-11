import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../../providers/home-service';

/**
 * Generated class for the BanklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-banklist',
  templateUrl: 'banklist.html'
})
export class BanklistPage {
  bank_list: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: HomeService
  ) 
  {
    this.getBankList();
  }
  
  async getBankList()
  {
    let return_data = await this.service.getTolBankList();
    if (return_data.code == 1)
    {
      this.bank_list = return_data.data;
    }
    else
    {
      this.bank_list = []
    }
  }

  choseBank(value)
  {
    console.log(value);
    let data = {"event_name": 'selected_bank', "value": value};
    App.event.emit(data);

    this.navCtrl.pop();
  }
}
