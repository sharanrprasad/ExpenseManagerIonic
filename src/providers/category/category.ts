import { HttpClient } from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import CategoryModel from "../../models/CategoryModel";
import {Observable} from "rxjs";
import * as endPoints from "../../endPoints";
import {UserProvider} from "../user/user";
import {getHttpJsonHeader} from "../../Utils";
import * as utils from "../../Utils";


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
            this.http.get<Array<CategoryModel>>(endPoints.GetCategories+this.userProvider.user.userId,{
              headers:getHttpJsonHeader(),
              observe:'response'
            }).subscribe(data => {

              this.categories =  data.body;
              this.categoriesMap = this.mapCategoies(this.categories);
              observer.next(this.categoriesMap);
              observer.complete();
            },
              error => {
                this.categories = [];
                observer.error(error.status);
                observer.complete();
              });
    });
  }

  getAllCategories(){
    return this.categories;
  }

  private mapCategoies(cate:Array<CategoryModel>):any{

    const returnObj = cate.reduce((previousValue,currentValue,index,array)=> {
     if(currentValue.expenseCategoryId) {
       previousValue[currentValue.expenseCategoryId.toString()] = currentValue;
     }
     return previousValue;
    },{});

    return returnObj;

  }


  public addParentCateogry(data: CategoryModel):Observable<CategoryModel>{
    const headerObj = utils.getHttpJsonHeader();
    return this.http.post<CategoryModel>(endPoints.AddCategoryParent, data, {
      headers : headerObj
      }
    );
  }



}
