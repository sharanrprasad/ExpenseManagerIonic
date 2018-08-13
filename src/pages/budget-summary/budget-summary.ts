import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SummaryProvider} from "../../providers/summary/summary";
import BudgetModel from "../../models/BudgetModel";
import {SummaryModel} from "../../models/dtoModelTypes";
import { Chart } from 'chart.js';

@Component({
  selector: 'page-budget-summary',
  templateUrl: 'budget-summary.html',
})
export class BudgetSummaryPage {


  budgetModel : BudgetModel;
  summaryData : SummaryModel;
  isDataAvilable : boolean;
  doughChart: any;
  isBalanceBelow: boolean;
  @ViewChild('doughnutCanvas') doughCanvas;

  constructor(public navCtrl: NavController, public navParams: NavParams, public summaryProvider: SummaryProvider, public  loadingCtrl:LoadingController,public toastCtrl:ToastController) {
    this.budgetModel = this.navParams.get('data');
    this.isDataAvilable = false;
    this.isBalanceBelow = false;
  }

  ionViewDidLoad(){
    const loader = this.loadingCtrl.create({
      content:"Loading.."
    });
    loader.present();
      this.summaryProvider.getSummaryData(this.budgetModel.fromDate,this.budgetModel.toDate,this.budgetModel.userId).subscribe(data => {
          this.summaryData = data;
          this.summaryData.expenditureCategoryList = Object.keys(this.summaryData.expenditureCategoryMap).map(key => this.summaryData.expenditureCategoryMap[key]);
          console.log(this.summaryData.expenditureCategoryList);
           this.generateChart();
          this.isDataAvilable = true;
         loader.dismissAll();

      },
        err => {
          console.log("Error [Budget Summary Controller]");
          loader.dismissAll();
          this.addToastErrorMessage("Error in getting Budget summary");
        });

  }

  addToastErrorMessage(message:string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  generateChart(){
    const balance = this.budgetModel.money - this.summaryData.totalExpenditure;
    let categoriesArray = this.summaryData.expenditureCategoryList.map(cat =>{
      return cat.expenseCategory.name
    });
    let dataArray = this.summaryData.expenditureCategoryList.map(cat => cat.categoryExpenditure);
    if(balance >= 0) {
      categoriesArray.push("balance");
      dataArray.push(balance);
      this.isBalanceBelow = true

    }
    let colorsArray = dataArray.map(data => this.dynamicColors());

    this.doughChart = new Chart(this.doughCanvas.nativeElement, {
      type: 'doughnut',
      data : {
        labels:categoriesArray,
        datasets : [{
          label: 'Spending Pattern',
          backgroundColor: colorsArray,
          data: dataArray
        }]
      }
    })
  }

   dynamicColors () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }





}
