import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SummaryModel} from "../../models/dtoModelTypes";
import {SummaryProvider} from "../../providers/summary/summary";
import {UserProvider} from "../../providers/user/user";
import {error} from "util";

/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  public summaryModel : SummaryModel;
  public fromDate:Date;
  public toDate:Date;
  public isDataAvilable : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public summaryProvider:SummaryProvider, public toastCtrl:ToastController, public userProvider:UserProvider) {

  }

  getSummary(){

    if(this.toDate == null || this.fromDate == null){
      return this.addToastErrorMessage("Select Date First");
    }

    this.summaryProvider.getSummaryData(this.fromDate,this.toDate,this.userProvider.user.userId).subscribe(next => {
      this.summaryModel = next;
      this.summaryModel.expenditureCategoryList = Object.keys(this.summaryModel.expenditureCategoryMap).map(key => this.summaryModel.expenditureCategoryMap[key]);
      this.isDataAvilable = true;
    }, err => {
        console.log("error in fetching summary", err.error);
        this.addToastErrorMessage("Could not get summary");
    })

  }


  addToastErrorMessage(message:string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }



}
