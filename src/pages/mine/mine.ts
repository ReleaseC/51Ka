import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
import { TAuth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public service: MineService,
    public auth: TAuth) 
  {
    this.OninitUser();
  }
  
  async OninitUser() {
    let data = await this.service.GetUserInfo();
    console.log(data);
    if (data.code == 1)
    {
      this.user = data.data;
    }
    else {
      this.navCtrl.push('LoginPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  } 

  Logout()
  {
    App.Loading('登出中...');
    console.log("is logout");
    this.auth.logout();
    this.navCtrl.push('RegisteradPage');
    App.FreeLoading();
  }

  PackageDays(days) {
    if(days == -1){
      return '永久有效'
    }else{
      return "套餐剩余天数："+ days +" 天";
    }
  }

  GetMemberlogo(data) {
    if (data == "钻石会员") {//钻石
      return 'assets/icon/mine/account-diamond-member.png'
    }
    else if (data == "黄金会员") {//黄金
      return  'assets/icon/mine/account-gold-member.png'
    }
    else if (data == "白金会员") {//白金
      return 'assets/icon/mine/account-platinum-member.png'
    }
    else {//普通
      return 'assets/icon/mine/general-member.png'
    }
  }

  CardNumber(cCard,dCard) {
    return cCard+'张信用卡，'+dCard+'张储蓄卡'
  }

  GetRateDetail(rank,rate) {
    switch (rank) {
      case '钻石会员' : return '费率'+rate+'%，去收款'
      case '黄金会员' : return '升级为白金会员,享'+rate+'%费率'
      case '白金会员' : return '升级为钻石会员,享'+rate+'%费率'
      default : return '开通会员，享超低费率'
    }
  }

  //跳转到头像的详情
  ToMinedetailPage() {
    this.navCtrl.push('MinedetailPage',{'userdetail': this.user });
  }

  //跳转到VIP会员的详情
  ToVipmemberPage() {
    this.navCtrl.push('VipmemberPage',{'vipdata': this.user });
  }  
  // 跳转取现记录
  ToTakecashnotePage() {
    this.navCtrl.push('TakecashnotePage');
  }

  //跳转到卡片管理
  ToCardmanagePage() {
    this.navCtrl.push('CardmanagePage');
  }

  //跳转到测试卡卷
  ToTestPage() {
    this.navCtrl.push('VoucherPage')
  }

  // 跳转取现记录
  ToRecashnotePage() {
    this.navCtrl.push('RecashnotePage');
  }

  //跳转到关于
  ToAboutPage() {
    this.navCtrl.push('AboutPage');
  }

  ToMineSubPage(data) {
    switch(data) {
      case 0 : this.ToMinedetailPage();break;
      case 1 : this.ToVipmemberPage(); break;
      case 2 : this.ToTakecashnotePage();break;
      case 3 : this.ToCardmanagePage();break;
      case 4 : this.ToTestPage();break;
      case 5 : this.ToRecashnotePage();break;
      case 6 : this.ToAboutPage();break;
    }
  }

  public user = [];
}
