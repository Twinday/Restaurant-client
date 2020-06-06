import { Component, OnInit } from '@angular/core';
import { OrderService, Dish, NewOrder} from '../shared/order.service';


@Component({
  selector: 'app-add-order',
  templateUrl: './addOrder.component.html',
  styleUrls: ['./addOrder.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(public orderservice: OrderService) {
    this.selected = '';
  }
  private loading = true;
  selected: string;
  selectedmenu: string[] = [];


  confirmOrder() { // формируем заказ и вызываем функцию загрузки
    const dishes: Dish[] = [];
    for (let i of this.selectedmenu) {
        for (let j of this.orderservice.menudishes) {
            if (i === j.name) {
                const tmp: Dish = {DishId: j.id};
                dishes.push(tmp);
            }
        }
    }
    const order: NewOrder = {
        date: new Date(),
        status: 0,
        waiterId: 1, // localStorage.getItem('UserID');
        orderDishes: dishes
    };
    this.orderservice.LoaderNewOrder(order).subscribe(() => {this.loading = false;
    });
}

addselected() {  // добавляем выбранное блюдо в заказ
  if (!this.selectedmenu.includes(this.selected)) {
  this.selectedmenu.push(this.selected);
  }
}

  ngOnInit() {
    this.orderservice.LoaderMenu().subscribe(() => {this.loading = false;
    });
  }
}
