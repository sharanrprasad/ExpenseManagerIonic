import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import BudgetModel from "../../models/BudgetModel";
import * as endPoints from "../../endPoints";
import {getHttpJsonHeader} from "../../Utils";


/*
  Generated class for the BudgetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BudgetProvider {

  constructor(public http: HttpClient) {
  }

  getCurrentBudget(userId:string):Observable<BudgetModel>{
    return this.http.get<BudgetModel>(endPoints.GetCurrentBudgetUrl+userId,{
      headers: getHttpJsonHeader()
    });
  }

  addBudget(budget: BudgetModel): Observable<BudgetModel>{
    return this.http.post<BudgetModel>(endPoints.AddBudgetUrl,budget,{
      headers: getHttpJsonHeader()
    });
  }

  deleteBudget(budgetId:number):Observable<BudgetModel>{
    return this.http.delete<BudgetModel>(endPoints.DeleteBudgetUrl+budgetId,{
      headers: getHttpJsonHeader()
    });
  }

  updateBudget(budgetModel:BudgetModel):Observable<BudgetModel>{
    return this.http.post<BudgetModel>(endPoints.UpdateBudgetUrl,budgetModel, {
      headers: getHttpJsonHeader()
    });
  }

}
