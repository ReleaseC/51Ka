import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MineService } from '../../providers/mine-service';
/**
 * Generated class for the TakecashnotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-takecashnote',
  templateUrl: 'takecashnote.html'
})
export class TakecashnotePage {

  listDatas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: MineService
  ) {
    this.listDatas = [];
  }

  async ngOnInit(){
    let return_data = await this.service.GetTakeCashList();
    console.log(return_data);
    let simu_data = {
      "code":1,
      "msg":"成功",
      "data":[
        {
          id:0,
          type:'card',
          amount:280900,
          time:'2017-11-11 14:30',
          status:1
        },
        {
          id:1,
          type:'alipay',
          amount:280900,
          time:'2017-11-11 15:30',
          status:1
        },
        {
          id:2,
          type:'wechat',
          amount:280900,
          time:'2017-12-11 16:30',
          status:2
        }
      ]
    }
    let list ;
    let simu_list = return_data.data;
    for(let i = 0; i < simu_list.length; i++){
      let tmp_time = simu_list[i].time.split(" ")[0].substr(0,7);
      let flag = 0;
      for( let j=0;j<this.listDatas.length;j++ ){
        if(this.listDatas[j].date == tmp_time){
          flag = 1;
          this.listDatas[j].data.push(simu_list[i]);
        }
      }
      if( flag == 0 ){
        let tmp_json = {
          date: tmp_time,
          data:[]
        }
        tmp_json.data.push(simu_list[i]);
        this.listDatas.push(tmp_json);
      }
    }
    
    for(let i = 0; i < this.listDatas.length; i++){
      let sum = 0;
      for(let j = 0; j < this.listDatas[i].data.length; j++){
        console.log(this.listDatas[i].data[j].amount);
        sum += this.listDatas[i].data[j].amount;
      }
      this.listDatas[i].sum = sum;
    }
    console.log(this.listDatas);
    
  }
}
