import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import UserModel from "../../models/UserModel";
import {LoginProvider} from "../../providers/login/login";
import {HttpResponse} from "@angular/common/http";
import {ErrorModel, UserSignUpModel} from "../../models/dtoModelTypes";
import {UserProvider} from "../../providers/user/user";
import * as Utils from '../../Utils';
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userData:UserModel;
  errorMessage:string

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider:LoginProvider,public userProvider:UserProvider, public loadingCtrl:LoadingController) {
    this.userData = new UserModel();
  }

  signupUser(){

    const loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    loader.present();

    this.loginProvider.signupUser(this.userData).subscribe((res :HttpResponse<UserSignUpModel|ErrorModel<Object>>) => {
      switch (res.status) {
        case 200 :
          this.saveandNaivagteToHome({...<UserSignUpModel>res.body});
          break;
        default:
          this.setErrorMessage("Something went wrong");
          break;
      }
    },
    error1 => {
      this.setErrorMessage("Bad request try again");
    }, () => {
        loader.dismissAll();
      })
}
  setErrorMessage(message:string){
    this.errorMessage = message;
  }

  saveandNaivagteToHome(data:UserSignUpModel){
    this.userProvider.setUserData(data.user);
    Utils.setToken(data.token);
    this.navCtrl.push(TabsPage);
  }



}
