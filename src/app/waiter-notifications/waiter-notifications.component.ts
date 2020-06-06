import { Component, OnInit } from '@angular/core';
import {OrderService } from '../shared/order.service';
@Component({
  selector: 'app-waiter-notifications',
  templateUrl: './waiter-notifications.component.html',
  styleUrls: ['./waiter-notifications.component.css']
})
export class WaiterNotificationsComponent implements OnInit {

  constructor(public service: OrderService) { }
  private Loading = true;

  ngOnInit() {
    this.service.LoaderNotifications().subscribe(() => {
      this.Loading = false;
    });
  }

}
