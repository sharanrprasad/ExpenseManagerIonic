import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserModel from "../../models/UserModel";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user: UserModel;

  constructor(public http: HttpClient) {

  }

  setUserData(user:UserModel){
    this.user = user;
  }

}
