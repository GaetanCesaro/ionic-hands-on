import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CityDetailsPage } from '../pages/city-details/city-details';
import { CityListPage } from '../pages/city-list/city-list';
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './error-handler';

import { CityService } from '../providers/city.provider';
import { LoggerService } from '../providers/logger.provider';
import { ConsoleLoggerService } from '../providers/console-logger.provider';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CityDetailsPage,
    CityListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CityDetailsPage,
    CityListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    GlobalErrorHandler,
    CityService,
    {provide: LoggerService, useClass: ConsoleLoggerService},
    HttpClient
  ]
})
export class AppModule {}
