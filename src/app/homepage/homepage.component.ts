import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
})
export class HomepageComponent implements OnInit {

  permitReg = false;
  permitAddIng = false;
  permitShowAllIng = false;
  permitShowLowIng = false;
  permitBuyIng = false;
  permitMenu = false;
  permitCreateOrder = false;
  permitCurrentOrders = false;
  permitSoldDishes = false;
  permitShowRevenue = false;
  permitMessage = false;

  constructor() { }

  ngOnInit() {
    this.viewButtonPermit();
  }

  viewButtonPermit() {
    switch (localStorage.getItem('role')) {
      case 'admin': {
         this.permitReg = true;
         this.permitShowAllIng = true;
         this.permitShowLowIng = true;
         this.permitMenu = true;
         this.permitSoldDishes = true;
         this.permitShowRevenue = true;
         break;
      }
      case 'cook': {
        this.permitShowAllIng = true;
        this.permitShowLowIng = true;
        this.permitCurrentOrders = true;
        break;
      }
      case 'waiter': {
        this.permitCreateOrder = true;
        this.permitMessage = true;
        break;
     }
     case 'provisor': {
      this.permitAddIng = true;
      this.permitShowAllIng = true;
      this.permitShowLowIng = true;
      this.permitBuyIng = true;
      break;
   }
   }
  }

}
