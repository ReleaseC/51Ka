import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the HandlecardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-handlecard',
  templateUrl: 'handlecard.html',
})
export class HandlecardPage {
  cardData: any;
  moreCards: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
    this.cardData = [
      {
        title:'温州银行51信用卡',
        imgSrc:'assets/imgs/card01.png',
        slogan:'10万秒批金卡，终生免收邮费',
        points:[
          '最高10万额度，最快1天下卡',
          '大额取现，免取现转账手续费',
          '免收年费，一卡傍身不求人'
        ]
      },
      {
        title:'交行标准VISA个人金卡',
        imgSrc:'assets/imgs/card01.png',
        slogan:'10万秒批金卡，终生免收邮费',
        points:[
          '最高10万额度，最快1天下卡',
          '大额取现，免取现转账手续费',
          '免收年费，一卡傍身不求人',
          '最高10万额度，最快1天下卡'
        ]
      },
      {
        title:'兴业人民币金卡信用卡',
        imgSrc:'assets/imgs/card01.png',
        slogan:'10万秒批金卡，终生免收邮费',
        points:[
          '最高10万额度，最快1天下卡',
          '大额取现，免取现转账手续费',
          '免收年费，一卡傍身不求人'
        ]
      }
    ]
    this.moreCards = [
      {
        imgSrc: 'assets/imgs/smsign.png',
        title: '温州银行',
        slogan: '最高10万额度',
        flag: '高额'
      },
      {
        imgSrc: 'assets/imgs/smsign.png',
        title: '苏州银行',
        slogan: '最高10万额度',
        flag: '活动'
      },
      {
        imgSrc: 'assets/imgs/smsign.png',
        title: '中信银行',
        slogan: '最高10万额度',
        flag: '高额'
      },
      {
        imgSrc: 'assets/imgs/smsign.png',
        title: '光大银行',
        slogan: '最高10万额度'
      },
      {
        imgSrc: 'assets/imgs/smsign.png',
        title: '浦发银行',
        slogan: '最高10万额度',
        flag: '秒批'
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HandlecardPage');
  }

}
