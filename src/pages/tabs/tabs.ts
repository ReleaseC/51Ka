import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'LoanPage';
  tab3Root = 'HandlecardPage';
  tab4Root = 'MinePage';

  constructor() {

  }
}
