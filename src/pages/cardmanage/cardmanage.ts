import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
import { HomeService } from '../../providers/home-service';

@IonicPage()
@Component({
  selector: 'page-cardmanage',
  templateUrl: 'cardmanage.html',
})
export class CardmanagePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public Service: MineService,
    public HomeService: HomeService,
    public alertCtrl: AlertController
  ) {
    this.GetTitlelist();
    this.GetCardlist();
  }

  ionViewDidLoad() {
    this.GetCardlist();
  }

  Changetop(event) {
    this.cardtype = event.cardtype;
    if(event.nownum == 0){
       event.nownum = 1
       for(var i=0;i<this.titlelist.length;i++){
         if(event == this.titlelist[i]){
            console.log(event)
         }else{
            this.titlelist[i].nownum = 0
         }
       }
    }else if(event.nownum == 1){
    }
    else{
      event.nownum = 0
    }
  }

  GetTitlelist() {
    this.titlelist.push({
      'title':'信用卡',
      'nownum':1,
      'cardtype':0
    })
    this.titlelist.push({
      'title':'储蓄卡',
      'nownum':0,
      'cardtype':1
    })
  }

  ngOnInit () {
    this.GetCardlist();
  }

  async GetCardlist(){
    let banklist = await this.Service.GetBankList();
    for(let card of banklist.data) {
      card.src = await this.GetScrImg(card.bank)
    }
    this.cardlist = banklist.data;
  

    console.log(this.cardlist)
  }
  
  AddCresitcard() {
    this.navCtrl.push('AddcreditcardPage')
  }

  AddDepositcard() {
    this.navCtrl.push('AdddepositcardPage')
  }

  GetCardNo(data) {
    return '*** *** *** *** '+data
  }

  async setPrimary(card) {
    if (card.primary ==1) {
      return App.ShowToast("该卡已经是主卡")
    }
    let result = await this.Service.setPrimary(card.id);
    if (result.code == 1) {
      App.ShowToast("修改成功")
    }
    else {
      App.ShowToast(result.msg)
    }
    this.GetCardlist();
  }

  DelBank(id) {
   let confirm = this.alertCtrl.create({
     title:'提示',
     message:'你确定要删除改卡吗？',
     buttons: [
      {
        text: '取消',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: '确定',
        handler: () => {
         this.ToDel(id);
        }
      }
    ]
   })
     confirm.present();
  }

  async GetScrImg(name) {
    let result = await this.HomeService.getTotalBankList(name);
    let id = result.data[0].id;
    return  'assets/bank_icon/bank_'+id+'.png';
  }

  async ToDel(id) {
    let result = await this.Service.DelBank(id);
    if (result.code == 1) {
      App.ShowToast("删除成功")
    }
    else {
      App.ShowToast(result.msg)
    }
    this.GetCardlist();
  }

  private titlelist=[];
  private cardtype = 0;
  private cardlist = [];
}
