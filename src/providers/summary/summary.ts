import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as endPoints from '../../endPoints';
import * as utils from '../../Utils';
import {Observable} from "rxjs";
import {SummaryModel} from "../../models/dtoModelTypes";


/*
  Generated class for the SummaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SummaryProvider {


  constructor(public http: HttpClient) {
  }

  getSummaryData(startDate:Date, endDate:Date, userId: string): Observable<SummaryModel>{
    return this.http.post<SummaryModel>(endPoints.GetSummaryUrl,{
      userId:userId,
      fromDate:startDate,
      toDate: endDate
    }, {
       headers : utils.getHttpJsonHeader()
    });
  }

}
