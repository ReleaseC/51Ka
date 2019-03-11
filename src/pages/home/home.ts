import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../services';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage 
{
  tabElement: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Service: HomeService,
    private iab: InAppBrowser )
  {
    this.InitFuncItems();
  }
  
  ToTakeCash()
  {
    this.navCtrl.push('CreditcardcashbackPage');
  }

  InitFuncItems()
  {
    this.FuncItems.push(
      {
        "name": '办信用卡',
        "src": 'assets/imgs/home-creditcard.png',
        "tag": 0
      }
    );

    this.FuncItems.push(
      {
        "name": '身份认证',
        "src": 'assets/imgs/auth.png',
        "tag": 1
      }
    );

    this.FuncItems.push(
      {
        "name": '会员福利',
        "src": 'assets/imgs/member-welfare.png',
        "tag": 2
      }
    );

    this.CardRecomData.push(
      {
        "name": '招商银行',
        "src": 'assets/imgs/member-welfare.png',
        "describe":'10万额度',
        "tag": 3
      }
    );

    this.CardRecomData.push(
      {
        "name": '中信银行',
        "src": 'assets/imgs/member-welfare.png',
        "describe":'1000元延误险',
        "tag": 4
      }
    );

    this.CardRecomData.push(
      {
        "name": '交通银行',
        "src": 'assets/imgs/member-welfare.png',
        "describe":'免息56天',
        "tag": 5
      }
    );

  }
 
  ToCashBack(data)
  {
    if(data == 0)
    {
      this.navCtrl.push('CreditcardcashbackPage');
    }
    else
    {
      this.navCtrl.push('CodecashbackPage');
    }
  }
  
  ToMinePage() {
    this.navCtrl.push('MinePage');
  }

  FuncItemClick(item)
  {
    switch(item.tag)
    {
      case 0:
      // const browser = this.iab.create('https://interacts.hq.vidata.com.cn/h5/card-platform/index.html?source=1036','_self',{location:'no'});
      // window.open("https://interacts.hq.vidata.com.cn/h5/card-platform/index.html?source=1036", "_self");
      // this.navCtrl.push('OffercreditPage', {
      //   browser: {
      //       title: '办信用卡',
      //       url: 'https://interacts.hq.vidata.com.cn/h5/card-platform/index.html?source=1036'
      //   }
  
    // });
        let url = 'https://interacts.hq.vidata.com.cn/h5/card-platform/index.html?source=1036';
        let data = {title: '办信用卡', url: url};
        this.navCtrl.push('OffercreditPage', {browser: data});

        // let return_data = this.Service.jumpPage();
        // console.log(return_data);
        break;
      case 1: 
        this.navCtrl.push('VerifyidPage'); 
        break;
      default: 
        App.ShowToast(item.name +'还在维护，敬请期待。', 3000, "bottom");
    }
  }

  private FuncItems = [];
  private CardRecomData = [];
}
