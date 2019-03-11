import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
declare var Wechat: any;
@IonicPage()
@Component({
  selector: 'page-vipmember',
  templateUrl: 'vipmember.html',
})
export class VipmemberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MineService) {

    let member = navParams.get('vipdata');
    this.GetPackagelist();
    this.GetPayList();
    this.GetMemberDetail(member);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VipmemberPage');
  }

  GetMemberDetail(data) {
    this.member = {
      "package_name": data.rank,
      "package_rate": data.rate,
      "package_time": data.packageDays,
      "package_id": this.GetPackageId(data.rank)
    }
  }

  GetPackageId(PackageName) {
    switch(PackageName) {
      case '黄金会员' : return 1;
      case '白金会员' : return 2;
      case '钻石会员' : return 3;
      case '普通会员' : return 4;
    }
     // TODO:此处过期返回5
  }

  async GetPackagelist() {
    let data = await this.serve.GetPackageList()
    this.Packagelist = data.data;
    //处理套餐
    this.Packagelist.forEach(element => {
      if (element.name == "黄金会员套餐" && this.member.package_id == 2) {
          element.pack_flag = false
      }
      console.log( element)
    });

  }
   
  GetPayList() {
    this.Paylist.push({
      "src":"assets/icon/mine/pay.png",
      "type":"支付宝",
      "checked":false,
      "id":1
    })
  }

  GetDays(days) {
    if(days == -1) {
      return '永久有效'
    }
    return days + '天有效期'
  }

  //获取图片路径
  GetImgSrc(name) {
    if (name == "黄金会员套餐") {
      return 'assets/icon/vipmember/gold-member.png'
    }
    else if (name == "白金会员套餐") {
      return 'assets/icon/vipmember/platinum-member.png'
    }
    else if (name == "钻石会员套餐") {
      return 'assets/icon/vipmember/diamond-member.png'
    }
   // let data = await this.serve.GetImgSrc(img);
   // return data;
  }

  ToChange(item,type) {
    if (item.pack_flag == false) {
      item.checked = false;
      App.ShowToast("不符合购买标准")
      console.log(item)
      return 
    }
    else if (type == "Package")
    {
      this.Change(item,this.Packagelist);
      this.sumnumber = item.price;
      this.pack_id = item.id;
    } 
    else if (type == "Pay")
    {
      this.Change(item,this.Paylist);
      this.buy_id = item.id;
    }
  }

  Change(item,List) {
    for (let i=0;i<List.length;i++) {
      if (item == List[i]) {
        item.checked = true
      }
      else {
          List[i].checked = false
      }
    }
  }

  async ToPay(){
    console.log(this.Paylist)
    if (this.pack_id  == null) {
      App.ShowToast("请选择套餐");
      return
    }
    else if (this.buy_id == null) {
      App.ShowToast("请选择支付方式");
      return
    }

    let buyresult = await this.serve.BuyPackage(this.pack_id);
    if(buyresult.code == 1){
      // App.ShowToast("购买成功")
        Wechat.isInstalled(function (installed) {
          alert("Wechat installed: " + (installed ? "Yes" : "No"));
          let params = {
            partnerid: buyresult.data.custId, // merchant id商户号
            prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id订单id
            noncestr: buyresult.data.nonceStr, // nonce随机字符串
            timestamp: buyresult.data.timeStamp, // timestamp
            sign: buyresult.data.paySign, //密钥keyMD5加密
          };
          
          Wechat.sendPaymentRequest(params, function () {
              alert("Success");
          }, function (reason) {
              alert("Failed: " + reason);
          });
      }, function (reason) {
          alert("Failed: " + reason);
      });
    } else {
      App.ShowToast("购买失败"+buyresult.msg)
    }

   
  
  }

  TopBgStyle() {
    //黄金会员
    if (this.member.package_id == 1) {
      return {
        'background-image': 'linear-gradient(90deg, #FFD000, #F6A100)'
      }
    }//白金会员
    else if (this.member.package_id == 2) {
      return {
        'background-image': 'linear-gradient(90deg, #66A1FF, #578BF4)'
      }
    }//钻石会员
    else if(this.member.package_id == 3) {
      return {
        'background-image': 'linear-gradient(90deg, #B98CFF, #807DEA)'
      }
    }//普通不是会员
    else if(this.member.package_id == 4){
      return {
        'background-image': 'linear-gradient(90deg, #3F4150, #323340)'
      }
    }//会员过期
    else if(this.member.package_id == 5){
      return {
        'background-image': 'linear-gradient(90deg, #3F4150, #323340)'
      }
    }
  }

  private Packagelist = [];
  private Paylist = [];
  private sumnumber = 0;
  private pack_id = null;
  private buy_id = null;
  private member;
  private pack_flag= 1;
}
