import { Component } from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {AddExpensePage} from "../add-expense/add-expense";
import {CategoryProvider} from "../../providers/category/category";
import {ExpenseProvider} from "../../providers/expense/expense";
import {UserProvider} from "../../providers/user/user";
import {P} from "@angular/core/src/render3";
import ExpenseModel from "../../models/ExpenseModel";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public fromDate:Date;
  public toDate:Date;
  public expenses: Array<ExpenseModel>;

  constructor(public navCtrl: NavController, public categoryProvider: CategoryProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public expenseProvider:ExpenseProvider, public userProvider:UserProvider) {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.expenses = [];

  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    loader.present();
    this.categoryProvider.fetchAllCategories().subscribe(next => {

    },error1 => {
      this.toastCtrl.create({
        message: 'Failed to fetch data',
        duration: 2000
      }).present();
    },
      () => {
      loader.dismissAll();
      });
  }

  getExpenses(){
    console.log(this.fromDate.toString() , this.toDate.toString());
    if(this.toDate == null || this.fromDate == null){
      return this.addToastErrorMessage("Select Date First");
    }
   const loader = this.loadingCtrl.create({
      content: "Fetching.."
    })

     loader.present().then(() => {
      this.expenseProvider.getAllExpenses(this.fromDate,this.toDate,this.userProvider.user.userId).subscribe(
        val => {
              this.expenses = val;
              loader.dismissAll();
        },
        error1 => {
          console.log("Error in Fetch ", error1.error);
          this.addToastErrorMessage("Unable to fetch");
            loader.dismissAll();
        }
      );
    });

  }

  gotoAddExpensePage(){
    this.navCtrl.push(AddExpensePage);
  }

  addToastErrorMessage(message:string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  deleteExpense(exp:ExpenseModel){
    this.expenseProvider.deleteExpense(exp.expenseId).subscribe(next => {
      let index = this.expenses.indexOf(exp);
      console.log("Index -- ",index)
      if(index !== -1) {
        this.expenses.splice(index, 1);
      }
    },
       err => {
       this.addToastErrorMessage("Something broke");
       })
  }






}
