import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {

  productsData:any;
  moneyRang: any;
  timeRang: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.productsData = [
      {
        imgSrc:'assets/imgs/img01.png',
        title:'轻借',
        moneyRange:'1000-3000',
        time:'10分钟',
        interest:'0.1%',
        date:'30天以内',
        remark:'年满18周岁'
      },
      {
        imgSrc:'assets/imgs/img01.png',
        title:'水象分析',
        moneyRange:'1000-3000',
        time:'10分钟',
        interest:'0.1%',
        date:'30天以内',
        remark:'年满15-55周岁，有支付宝'
      },
      {
        imgSrc:'assets/imgs/img01.png',
        title:'新浪有还',
        moneyRange:'1000-3000',
        time:'10分钟',
        interest:'0.1%',
        date:'30天以内',
        remark:'年满20周岁'
      }
    ]
    this.moneyRang = "金额不限"
    this.timeRang = "时间不限"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanPage');
  }
  showMoney() {
    let alert = this.alertCtrl.create();
    alert.setTitle('借贷金额');

    alert.addInput({
      type: 'radio',
      label: '金额不限',
      value: '金额不限',
      checked: this.moneyRang == "金额不限" ? true: false
    });

    alert.addInput({
      type: 'radio',
      label: '3000以下',
      value: '3000以下',
      checked: this.moneyRang == "3000以下" ? true: false
    });
    alert.addInput({
      type: 'radio',
      label: '3000-10000',
      value: '3000-10000',
      checked: this.moneyRang == "3000-10000" ? true: false
    });
    alert.addInput({
      type: 'radio',
      label: '10000以上',
      value: '10000以上',
      checked: this.moneyRang == "10000以上" ? true: false
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.moneyRang = data;
      }
    });
    alert.present();
  }
  showTime() {
    let alert = this.alertCtrl.create();
    alert.setTitle('借款期限');

    alert.addInput({
      type: 'radio',
      label: '时间不限',
      value: '时间不限',
      checked: this.timeRang == "时间不限" ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: '30天以内',
      value: '30天以内',
      checked: this.timeRang == "30天以内" ? true : false
    });
    alert.addInput({
      type: 'radio',
      label: '30天以上',
      value: '30天以上',
      checked: this.timeRang == "30天以上" ? true : false
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.timeRang = data;
      }
    });
    alert.present();
  }

}
