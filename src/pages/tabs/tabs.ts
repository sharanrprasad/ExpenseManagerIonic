import { Component } from '@angular/core';

import { BudgetPage } from '../budget/budget';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BudgetPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
