import { Component, OnInit } from '@angular/core';
import {IngService, UsedDish} from '../shared/ing.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-used-dishes',
  templateUrl: './used-dishes.component.html',
  styleUrls: ['./used-dishes.component.css']
})
export class UsedDishesComponent implements OnInit {

  constructor(public ingservice: IngService) {
    this.startDate = new Date();
    this.endDate = new Date();
   }
  startDate: Date;
  endDate: Date;
  private Loading = true;
  myDish: UsedDish[] = [];

  LoadDish() {
    this.ingservice.LoaderUsedDish(this.startDate, this.endDate).subscribe((z) => {
      this.myDish = z;
      this.Loading = false;
    });
  }

  changeStart(event: MatDatepickerInputEvent<Date>) {
    this.startDate = new Date(`${event.value}`);
  }

  changeEnd(event: MatDatepickerInputEvent<Date>) {
    this.endDate = new Date(`${event.value}`);
  }




  ngOnInit() {
  }

}
