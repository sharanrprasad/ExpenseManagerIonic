import { Component } from '@angular/core';

import { BudgetPage } from '../budget/budget';
import { HomePage } from '../home/home';
import {SummaryPage} from "../summary/summary";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SummaryPage;
  tab3Root = BudgetPage;

  constructor() {

  }
}
