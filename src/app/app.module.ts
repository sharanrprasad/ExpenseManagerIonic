import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BudgetPage } from '../pages/budget/budget';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import {LoginPage} from "../pages/login/login";
import {HttpClientModule} from "@angular/common/http";
import {SignupPage} from "../pages/signup/signup";
import { UserProvider } from '../providers/user/user';
import {AddExpensePage} from "../pages/add-expense/add-expense";
import { ExpenseProvider } from '../providers/expense/expense';
import { CategoryProvider } from '../providers/category/category';
import { SummaryProvider } from '../providers/summary/summary';
import {SummaryPage} from "../pages/summary/summary";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AddExpensePage,
    BudgetPage,
    SummaryPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BudgetPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AddExpensePage,
    SummaryPage
  ],
  providers: [
    UserProvider,
    ExpenseProvider,
    LoginProvider,
    CategoryProvider,
    SummaryProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
