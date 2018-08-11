import {HttpHeaders} from "@angular/common/http";

let myToken:string = '';

export function getHttpJsonHeader():HttpHeaders{
  console.log("Auth token ", myToken);
  return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer " +myToken
    });
}

export function  setToken(token:string) {
  myToken = token;
}




