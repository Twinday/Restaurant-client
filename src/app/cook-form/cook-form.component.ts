import { Component, OnInit } from '@angular/core';
import { OrderService, Order} from '../shared/order.service';

@Component({
  selector: 'app-cook-form',
  templateUrl: './cook-form.component.html',
  styleUrls: ['./cook-form.component.css']
})

export class CookFormComponent implements OnInit {
  constructor(public orderservice: OrderService) {
   }
  private Loading = true;

   completeOrder(ord: Order) {
     ord.status = 2;
     this.deleteInService(ord);
     this.orderservice.LoaderCompleteOrder(ord).subscribe(() => {this.Loading = false;
    });
     this.orderservice.LoaderCookingOrders().subscribe(() => {this.Loading = false; });
   }

   deleteInService(ord: Order) {
    for (let i = 0; i < this.orderservice.cookingOrders.length; ++i) {
      if (ord.id === this.orderservice.cookingOrders[i].id) {
        this.orderservice.cookingOrders.splice(i, 1);
      }
    }
   }

   deleteInServiceFree(ord: Order) {
   for (let i = 0; i < this.orderservice.freeOrders.length; ++i) {
     if (ord.id === this.orderservice.freeOrders[i].id) {
       this.orderservice.freeOrders.splice(i, 1);
     }
   }
  }


  takeOrder(ord: Order) {
    ord.status = 1;
    this.deleteInServiceFree(ord);
    this.orderservice.LoaderTakenOrder(ord).subscribe(() => {
      this.Loading = false;
      this.orderservice.LoaderCookingOrders().subscribe(() => { this.Loading = false; });
      this.orderservice.LoaderFreeOrders().subscribe(() => { this.Loading = false; });
    });
  }



  ngOnInit() {
    this.orderservice.LoaderFreeOrders().subscribe(() => {this.Loading = false;
    });
    this.orderservice.LoaderCookingOrders().subscribe(() => {this.Loading = false;
    });
  }
}
