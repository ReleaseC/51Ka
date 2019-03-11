
    import {Injectable} from '@angular/core';
    import {ToastController, LoadingController} from 'ionic-angular';
    import {Camera, CameraOptions} from '@ionic-native/camera';

    @Injectable()
    export class NativeService {
      private toast;
      private loading;

      constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private camera: Camera,) {
      }

      /**
       * 统一调用此方法显示提示信息
       * @param message 信息内容
       * @param duration 显示时长
       */
      showToast = (message: string = '操作完成', duration: number = 2500) => {
        this.toast = this.toastCtrl.create({
          message: message,
          duration: duration,
          position: 'top',
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        this.toast.present();
      };

      /**
       * 关闭信息提示框
       */
      hideToast = () => {
        this.toast.dismissAll()
      };

      /**
       * 统一调用此方法显示loading
       * @param content 显示的内容
       */
      showLoading = (content: string = '') => {
        this.loading = this.loadingCtrl.create({
          content: content
        });
        this.loading.present();
        setTimeout(() => {//最长显示20秒
          this.loading.dismiss();
        }, 20000);
      };

      /**
       * 关闭loading
       */
      hideLoading = () => {
        this.loading.dismissAll()
      };

      /**
       * 使用cordova-plugin-camera获取照片的base64
       * @param options
       * @return {Promise<T>}
       */
      getPicture = (options) => {
        return new Promise((resolve, reject) => {
          this.camera.getPicture(Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
            destinationType: this.camera.DestinationType.DATA_URL,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
            quality: 90,//保存的图像质量，范围为0 - 100
            allowEdit: true,//选择图片前是否允许编辑
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 800,//缩放图像的宽度（像素）
            targetHeight: 800,//缩放图像的高度（像素）
            saveToPhotoAlbum: false,//是否保存到相册
            correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
          }, options)).then((imageData) => {
            resolve(imageData);
          }, (err) => {
            console.log(err);
            err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
          });
        });
      };

      /**
       * 通过图库获取照片
       * @param options
       * @return {Promise<T>}
       */
      getPictureByPhotoLibrary = (options = {}) => {
        return new Promise((resolve) => {
          this.getPicture(Object.assign({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
          }, options)).then(imageBase64 => {
            resolve(imageBase64);
          }).catch(err => {
            String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
          });
        });
      };

      /**
       * 通过拍照获取照片
       * @param options
       * @return {Promise<T>}
       */
      getPictureByCamera = (options = {}) => {
        return new Promise((resolve) => {
          this.getPicture(Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA
          }, options)).then(imageBase64 => {
            resolve(imageBase64);
          }).catch(err => {
            String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
          });
        });
      };

    }