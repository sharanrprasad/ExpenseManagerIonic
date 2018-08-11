import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import ExpenseModel from "../../models/ExpenseModel";
import {CategoryProvider} from "../../providers/category/category";
import CategoryModel from "../../models/CategoryModel";
import {ExpenseProvider} from "../../providers/expense/expense";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {

  public expenseData:ExpenseModel;
  public categories :  Array<CategoryModel>;
  public errorMessage:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryProvider:CategoryProvider, public loadingCtrl: LoadingController, public expenseProvider: ExpenseProvider,
             public userProvider: UserProvider) {
    this.expenseData = new ExpenseModel();
    this.errorMessage = "";
  }

  ionViewDidLoad(){
    this.categories = this.categoryProvider.getAllCategories();
    console.log("This Category l ", this.categories);
  }

  addExpenseAndGoToHome(){
    const loader = this.loadingCtrl.create({
      content: "Adding...",
    });
    loader.present().then(val => {
      this.expenseData.userId = this.userProvider.user.userId;
      this.expenseProvider.addExpense(this.expenseData).subscribe(
        next => {
          loader.dismissAll();
          this.navCtrl.pop();
        }, error => {
          this.errorMessage = "Something went wrong";
          loader.dismissAll();
        }
      )
    });


  }



}
