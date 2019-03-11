import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ModalcontentPage } from '../modalcontent/modalcontent';
import { HomeService } from '../services';

@IonicPage()
@Component({
  selector: 'page-creditcardcashback',
  templateUrl: 'creditcardcashback.html',
})
export class CreditcardcashbackPage {
  isAddCard1: boolean;
  isAddCard2: boolean;
  cards_data: any;
  user_data: any;
  paycard: string;
  comecard: string;
  paycardId: string;
  comecardId: string;
  _amount: string;
  isActived: boolean;
  discount: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public service: HomeService,
    public alertCtrl: AlertController) 
  { 
    this.isAddCard1 = false;
    this.isAddCard2 = false;
    this.user_data = App.userInfo;
    this.judgeDiscount();
    this.judgeCards();
  }

  ionViewDidEnter()
  {
    console.log(this.user_data);
    if (!this.user_data.userId)
    {
      App.ShowToast('请先登录或注册');
      this.navCtrl.push('RegisteradPage');
      return
    }
    if (this.user_data.idCardNo == null)
    {
      this.showApprove();
    }

    
  }

  judgeDiscount()
  {
    if(this.user_data.rank == "普通会员") 
    {
      this.discount = "0.50";
    }
    else if(this.user_data.rank == "黄金会员")
    {
      this.discount = "0.45";
    }
    else if(this.user_data.rank == "白金会员")
    {
      this.discount = "0.42";
    }
    else if(this.user_data.rank == "钻石会员")
    {
      this.discount = "0.40";
    }
  }

  async judgeCards()
  {
    let return_cards_data = await this.service.getCardData();

    if(return_cards_data)
    {
      this.cards_data = return_cards_data;
    }
    let card_1 = this.readCard(0);
    let card_2 = this.readCard(1);

    if(card_1)
    {
      this.isAddCard1 = true;
      this.paycard = card_1;
    }
    else
    {
      this.isAddCard1 = false;
    }

    if(card_2)
    {
      this.isAddCard2 = true;
      this.comecard = card_2;
    }
    else
    {
      this.isAddCard2 = false;
    }
  }

  showApprove() 
  {
    let confirm = this.alertCtrl.create({
      message: '为了您的资金安全，首次刷卡时需要进行认证',
      cssClass: 'alert_ticket',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.navCtrl.push('HomePage');
          }
        },
        {
          text: '去认证',
          handler: () => {
            this.navCtrl.push('ApprovePage');
          }
        }
      ]
    });
    confirm.present();
  }

  changeCard(index) 
  { 
    let card;
    switch (index) 
    {
      case 0: 
      card= this.paycard;
      break;
      case 1:
      card= this.comecard;
      break;
    }
    let modal = this.modalCtrl.create(
      'ModalcontentPage',
      {
        data: this.cards_data.data, 
        type: index, 
        show_bank: card
      }
    );
    modal.onDidDismiss(data => {
      switch(data.type)
      {
        case 0:
        this.paycard = data.bank_name;
        break;
        case 1:
        this.comecard = data.bank_name;
        break;
      }
    });
    modal.present();
  }

  toAddCreditCard() 
  {
    this.navCtrl.push('AddcreditcardPage');
  }

  toAddDepositCard() 
  {
    this.navCtrl.push('AdddepositcardPage');
  }

  PayNext() 
  {
    this.navCtrl.push('ConfirmpayPage',{
      amount: this._amount,
      paycard: this.paycard,
      comecard: this.comecard,
      paycardId: this.paycardId,
      comecardId: this.comecardId,
      discount: (100-this.discount)/100
    });
  }

  readCard(card_type) 
  {
    let result_card;
    let flag = 0;
    for(let i = 0; i < this.cards_data.data["length"]; i++) 
    {
      if(this.cards_data.data[i].primary == "1" && this.cards_data.data[i].type == card_type) 
      {
        flag = 1;
        if (card_type == 0)
        {
          this.paycardId = this.cards_data.data[i].id;
        }
        else
        {
          this.comecardId = this.cards_data.data[i].id;
        }
        return this.cards_data.data[i].bank+"("+this.cards_data.data[i].cardNo+")";
      }
    }
    if(flag == 0)
    {
      for(let i = 0; i < this.cards_data.data["length"]; i++) 
      {
        if( this.cards_data.data[i].type == card_type ) 
        {
          if (card_type == 0)
          {
            this.paycardId = this.cards_data.data[i].id;
          }
          else
          {
            this.comecardId = this.cards_data.data[i].id;
          }
          return this.cards_data.data[i].bank+"("+ this.cards_data.data[i].cardNo+")";
        }
      }
    }
  }

  get amount(): string 
  {
    return this._amount;
  }

  set amount(value: string) 
  {
    this._amount = value;
    if(this._amount.length >= 1 && this.isAddCard1 && this.isAddCard2){
      this.isActived = true;
    }else{
      this.isActived = false;
    }
  }

}
