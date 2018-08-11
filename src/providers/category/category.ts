import { HttpClient } from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import CategoryModel from "../../models/CategoryModel";
import {Observable} from "rxjs";
import * as endPoints from "../../endPoints";
import {UserProvider} from "../user/user";
import {getHttpJsonHeader} from "../../Utils";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  public categories: Array<CategoryModel>;
  public categoriesMap : {
    [id:string]:CategoryModel
  }

  constructor(public http: HttpClient, public userProvider:UserProvider) {
    this.categories = [];
  }

  fetchAllCategories(): Observable<Array<CategoryModel>>{
    return Observable.create(observer => {
        if(this.categories != null && this.categories.length > 0){
           observer.next(this.categories);
          observer.complete();
        }else{
            this.http.get<Array<CategoryModel>>(endPoints.GetCategories+this.userProvider.user.userId,{
              headers:getHttpJsonHeader()
            }).subscribe(data => {
              this.categories = data;
              this.categoriesMap = this.mapCategoies(this.categories);
              observer.next(this.categories);
              observer.complete();
            },
              error => {
                this.categories = [];
                observer.error(error.status);
                observer.complete();
              });
        }
    });
  }

  getAllCategories(){
    return this.categories;
  }

  private mapCategoies(categories:Array<CategoryModel>):any{
   return categories.reduce((previousValue,currentValue,index,array)=> {
     previousValue[currentValue.exenseCategoryId] = currentValue;
      return previousValue;
    }, {});
  }



}
