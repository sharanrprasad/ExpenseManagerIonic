import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import CategoryModel from "../../models/CategoryModel";
import {UserProvider} from "../../providers/user/user";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {


  public categoryModel: CategoryModel;
  public reloadHome : boolean;
  public errorMessage : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public userProvider : UserProvider, public categoryProvider: CategoryProvider) {
    this.categoryModel = new CategoryModel();
    this.reloadHome = false;
    this.errorMessage = "";
  }

  ionViewDidLoad() {
  }

  addCategoryAndNaviagte(){

    this.errorMessage = "";

    if(!this.categoryModel.name){
      this.errorMessage = "Select the name";
      return;
    }

    const loader = this.loadingCtrl.create({
      content: "Adding...",
    });
    loader.present().then(val => {
      this.categoryModel.userId = this.userProvider.user.userId;
      this.categoryProvider.addParentCateogry(this.categoryModel).subscribe(
        next => {
          loader.dismissAll();
          this.reloadHome = true;
          this.navCtrl.pop();
        }, error => {
          this.errorMessage = "Something went wrong";
          loader.dismissAll();
        }
      )
    });
  }

  ionViewWillLeave() {
    if(this.reloadHome) {
      console.log("Added Expense to Home");
      this.navCtrl.getPrevious().data.reloadView = true;
    }
  }





}
