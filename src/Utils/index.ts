import {HttpHeaders} from "@angular/common/http";

let myToken:string = '';

export function getHttpJsonHeader():HttpHeaders{
  return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': myToken
    });
}

export function  setToken(token:string) {
  myToken = token;
}




