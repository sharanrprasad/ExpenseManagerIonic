import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {ErrorModel, LoginData, UserSignUpModel} from "../../models/dtoModelTypes";
import UserModel from "../../models/UserModel";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupPage} from "../signup/signup";
import {UserProvider} from "../../providers/user/user";
import * as Utils from '../../Utils';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  loginData : LoginData;
  isFetching : boolean;
  errorMessage : string

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public userProvider:UserProvider) {
    this.loginData = {
      email:"",
      password:""
    }
    this.errorMessage = "";
  }

  loginUser(){
    console.log(this.loginData);
    this.isFetching = true;
    this.setErrorMessage("");
    this.loginProvider.loginUser(this.loginData).subscribe((res:HttpResponse<UserSignUpModel|ErrorModel<Object>>) => {
        console.log(res.body);
        this.saveandNavigateToHome({...<UserSignUpModel>res.body});
        },
      err => {
      switch (err.status) {
        case 400:
          this.setErrorMessage("User Not found");
          break;
        default:
          this.setErrorMessage("Something went worng");
          break;
      }
      });
  }

  saveandNavigateToHome(user:UserSignUpModel){
    this.userProvider.setUserData(user.user);
    Utils.setToken( user.token);
    this.navCtrl.push(SignupPage);
  }

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }


  setErrorMessage(message:string){
      this.errorMessage = message;
  }





}
