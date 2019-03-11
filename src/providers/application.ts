import { Injectable, Injector, Inject, EventEmitter } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

declare global
{
    /* extends Application to window global variable */
    var App: TApplication | undefined;

    interface Window
    {
        App: TApplication | undefined;
    }
}

@Injectable()
export class TApplication
{
    constructor(Injector: Injector)
    {
        console.log('TApplication construct');
        window.App = this;

        //this.location = Injector.get(Location);
        this.loadingCtrl = Injector.get(LoadingController);
        this.Toastr = Injector.get(ToastController);

        // tslint:disable-next-line:no-unused-expression
    }

    ShowToast(message, duration = 2000, position = "middle")
    {
        let toast = this.Toastr.create(
            {
                message: message,
                duration: duration,
                position: position,
            }
        );

        toast.present(toast);
    }
    
    Loading(context="数据加载中", duration=8000)
    {
        this.loader = this.loadingCtrl.create(
            {
                content: context,
                duration: duration
            }
        );

        this.loader.present();
    }

    FreeLoading()
    {
        if (this.loader != undefined)
        {
            this.loader.dismiss();
        }
    }
    
    date2str(date)
    {
        let dateSeparator = "-";    
        let year = date.getFullYear();// 获取完整的年份(4位,1970)
        let month = date.getMonth();// 获取月份(0-11,0代表1月,用的时候记得加上1)
        let day = date.getDate();// 获取日(1-31)

        let Y = year + dateSeparator;
        let M = ((month + 1) > 9 ? (month + 1) : ('0' + (month + 1))) + dateSeparator;
        let D = (day > 9 ? day : ('0' + day));

        return Y + M + D;
    }           

    private Toastr;
    private loadingCtrl;
    private loader;
    public event = new EventEmitter();

    public userInfo = {};
}