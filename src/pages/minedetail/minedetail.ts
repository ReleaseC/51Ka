import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, AlertController, ViewController } from 'ionic-angular';
import { NativeService } from '../../providers/NativeService';
import { MineService } from '../../providers/mine-service';

@IonicPage()
@Component({
  selector: 'page-minedetail',
  templateUrl: 'minedetail.html',
})
export class MinedetailPage {
  public base64Image: string;
  images: Array<{ src: String}>

  isChange: boolean = false;//头像是否改变标识
  avatarPath: string = 'assets/icon/delete/img/head.png';//用户默认头像
  imageBase64: string;//保存头像base64,用于上传

  constructor(
     private viewCtrl: ViewController,
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController, 
     public platform: Platform,
     public modalCtrl: ModalController,
     private camera: Camera,
     private nativeService: NativeService,
     private servive: MineService
  ) {
    this.images = []
    let member = navParams.get('userdetail');
    this.GetUserInfo(member);
  }

  GetUserInfo(data) {
    this.user = {
      "img":"assets/icon/delete/head.PNG",
      "nickname":"ID1803760",
      "sex": "未设置",
      "user_ID":"1803760",
      "tel":"136*****4797"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinedetailPage');
  }

  ToUploadimg() {

    let options = {
      targetWidth: 400,
     targetHeight: 400
    };

    let actionSheet = this.alertCtrl.create({
      title:'上传头像',
      buttons: [
        {
          text: '相册',
          handler: () => {
            this.nativeService.getPictureByPhotoLibrary(options).then(imageBase64 => {
              this.getPictureSuccess(imageBase64);
            });
          }
        },
        {
          text: '相机拍照',
          handler: () => {
            this.nativeService.getPictureByCamera(options).then(imageBase64 => {
              this.getPictureSuccess(imageBase64);
            });
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  private getPictureSuccess(imageBase64) {
    this.isChange = true;
    this.imageBase64 = <string>imageBase64;
    this.avatarPath = 'data:image/jpeg;base64,' + imageBase64;
  }

  async saveAvatar() {
    // if (this.isChange) {
    //   alert(this.imageBase64)
    //   console.log(this.imageBase64);//这是头像数据.
    //   // this.nativeService.showLoading('正在上传....');
    //   let data = {avatarPath: this.avatarPath};
      // this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.
      //调用上传头像
      let result = await this.servive.Upload("image1=<文件体>")
      alert(result);
    //   App.ShowToast(result.msg)
    // } else {
    //   this.dismiss();
    // }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ToUpdateNickName() {
      let profileModal = this.modalCtrl.create('NickPage',{"nickname":this.user.nickname});
      profileModal.onDidDismiss(data => {
        if (data!=null){
          this.user.nickname = data.nickname;
        }
   });
   profileModal.present();
  }

  changesex() {
    let alert = this.alertCtrl.create();
    alert.setTitle('选择性别');

    alert.addInput({
      type: 'radio',
      label: '男',
      value: '男',
      checked: this.user.sex == "男" ? true: false
    });

    alert.addInput({
      type: 'radio',
      label: '女',
      value: '女',
      checked: this.user.sex == "女" ? true: false
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.user.sex = data;
      }
    });
    alert.present();
  }

  private user;
}
