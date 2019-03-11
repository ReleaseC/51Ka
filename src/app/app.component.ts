import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TApplication } from '../providers/application';
import { TAuth } from '../providers/auth'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    App: TApplication,
    Auth: TAuth ) 
  {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    platform.registerBackButtonAction(() => {
      platform.exitApp()
    },1);
    if (!Auth.has_logon())
    {
      this.rootPage = "RegisteradPage";
    }
    else {
      Auth.getUserData();
      console.log(localStorage.getItem('token'));
      this.rootPage = TabsPage;
    }
    
  }

}
