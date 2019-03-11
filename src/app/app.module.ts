import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { TApplication } from '../providers/application';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TAuth } from '../providers/auth';
import { HomeService } from '../providers/home-service';
import { MineService } from '../providers/mine-service';
import { Camera } from '@ionic-native/camera';
import { NativeService } from '../providers/NativeService';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      },
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      mode:'ios',
      backButtonText: '', 
      backButtonIcon: 'ios-arrow-back' 
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TApplication,
    TAuth,
    Camera,
    InAppBrowser,
    HomeService,
    MineService,
    NativeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
