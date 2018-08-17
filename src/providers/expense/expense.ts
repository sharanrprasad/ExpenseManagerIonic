import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import ExpenseModel from "../../models/ExpenseModel";
import * as utils from "../../Utils";
import {UserSignUpModel} from "../../models/dtoModelTypes";
import * as endPoints from "../../endPoints";
import {Observable} from "rxjs";
import {UserProvider} from "../user/user";

/*
  Generated class for the ExpenseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseProvider {

  constructor(public http: HttpClient, public userProvider:UserProvider) {
    console.log('Hello ExpenseProvider Provider');
  }

  addExpense(expenseData: ExpenseModel):Observable<HttpResponse<ExpenseModel>>{
    const headerObj = utils.getHttpJsonHeader();
    return this.http.post<ExpenseModel>(endPoints.AddExpenseUrl, expenseData, {
      headers: headerObj,
      observe: 'response'
    });
  }


  deleteExpense(expenseId:number):Observable<HttpResponse<ExpenseModel>>{
    const headerObj = utils.getHttpJsonHeader();
    return this.http.delete<ExpenseModel>(endPoints.DeleteExpenseUrl+expenseId,{
      headers: headerObj,
      observe: 'response'
    });
  }


  getAllExpenses(startDate:Date, endDate:Date, userId: string) : Observable<Array<ExpenseModel>>{
    let headerObj = utils.getHttpJsonHeader();
    headerObj = headerObj.append("start_date",startDate.toString());
     headerObj = headerObj.append("end_date",  endDate.toString());
      return this.http.get<Array<ExpenseModel>>(endPoints.GetExpenses+userId,{
        headers: headerObj
      });
  }


  getTopExpenses(userId:string) : Observable<Array<ExpenseModel>> {
    let headerObj = utils.getHttpJsonHeader();
    return this.http.get<Array<ExpenseModel>> (  endPoints.GetExpensesTop+userId, {
      headers: headerObj
    });
  }

}
