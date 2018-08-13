import { Component } from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';
import {BudgetProvider} from "../../providers/budget/budget";
import BudgetModel from "../../models/BudgetModel";
import {UserProvider} from "../../providers/user/user";
import {AddBudgetPage} from "../add-budget/add-budget";
import {BudgetSummaryPage} from "../budget-summary/budget-summary";

@Component({
  selector: 'page-about',
  templateUrl: 'budget.html'
})
export class BudgetPage {

  currentBudget: BudgetModel;
  isBudgetDataAvilable : boolean;

  constructor(public navCtrl: NavController, public budgetProvider:BudgetProvider,public userProvider:UserProvider, public toastCtrl:ToastController, public modalCtrl: ModalController) {
    this.currentBudget = new BudgetModel();
    this.isBudgetDataAvilable = false;
  }

  ionViewDidLoad(){
    this.budgetProvider.getCurrentBudget(this.userProvider.user.userId).subscribe(data => {
        this.currentBudget = data;
        this.isBudgetDataAvilable = true;
    }, error1 => {
      console.log("Error [Get Current Budget]",error1.error);
      this.addToastErrorMessage("No Current Budget Found");
    })
  }

  addToastErrorMessage(message:string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  editCurrentBudget(){
    const modal = this.modalCtrl.create(AddBudgetPage,{data : this.currentBudget});
    modal.present();
  }

  async goToAddBudgetPage(){
    const modal = this.modalCtrl.create(AddBudgetPage);
    await modal.present();
  }

  gotoBudgetSummary(){
    this.navCtrl.push(BudgetSummaryPage,{
      data: this.currentBudget
    });

  }






}
