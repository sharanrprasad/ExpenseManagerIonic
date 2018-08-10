import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RXJS} from "@ionic/app-scripts";
import * as endPoints from "../../endPoints";
import {ErrorModel, LoginData, UserSignUpModel} from "../../models/dtoModelTypes";
import {Observable} from "rxjs";
import UserModel from "../../models/UserModel";
import * as utils from  "../../Utils";
import 'rxjs/add/operator/map'

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {

  }

  loginUser(loginData: LoginData): Observable<HttpResponse<UserSignUpModel | ErrorModel<object>>> {

    const headerObj = utils.getHttpJsonHeader();
    return this.http.post<UserSignUpModel>(endPoints.LoginUrl, loginData, {
      headers: headerObj,
      observe: 'response'
    });
  }

  signupUser(user:UserModel):Observable<HttpResponse<UserSignUpModel | ErrorModel<object>>> {

    const headerObj = utils.getHttpJsonHeader();
    return this.http.post<UserSignUpModel>(endPoints.SignUpUrl, user, {
      headers: headerObj,
      observe: 'response'
    }).map(value => {
      console.log(value);
      return value;
    });
  }

}
