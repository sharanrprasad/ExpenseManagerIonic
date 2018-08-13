import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import BudgetModel from "../../models/BudgetModel";
import {BudgetProvider} from "../../providers/budget/budget";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the AddBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-budget',
  templateUrl: 'add-budget.html',
})
export class AddBudgetPage {

  public budgetModel : BudgetModel;
  public isEditing : boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,public budgetProvider: BudgetProvider,
              public loadingCtrl:LoadingController,public toastCtrl:ToastController, public userProvider:UserProvider) {
    if(this.navParams.get('data') != null){
      this.budgetModel =  this.navParams.get('data');
      this.isEditing = true;
    }else{
      this.isEditing = false;
      this.budgetModel = new BudgetModel();
    }


  }

  addOrUpdateBudget(){
    const loader = this.loadingCtrl.create({
      content: "Adding...",
    });
    let apiObservable;
    if(this.isEditing){
      apiObservable = this.budgetProvider.updateBudget(this.budgetModel);
    }else{
      apiObservable = this.budgetProvider.addBudget(this.budgetModel);
    }

    loader.present().then(() => {
      this.budgetModel.userId = this.userProvider.user.userId;
      apiObservable.subscribe(data => {
        loader.dismissAll();
        this.viewCtrl.dismiss();
      },err=> {
        console.log(err.error);
        loader.dismissAll();
        this.addToastErrorMessage("Budget Already Found Please Select a different date");
      })
    })
  }

  addToastErrorMessage(message:string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

}
