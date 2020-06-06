import { Component, OnInit } from '@angular/core';
import {IngService } from '../shared/ing.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.sass']
})
export class RevenueComponent implements OnInit {

  constructor(public ingservice: IngService) {
    this.startDate = new Date();
    this.endDate = new Date();
   }
  startDate: Date;
  endDate: Date;
  private Loading = true;
  myrev = '';

  LoadRevenue() {
    this.ingservice.LoaderRevenue(this.startDate, this.endDate).subscribe((z) => {
      this.myrev = z;
      alert('Выручка = ' + z.revenue);
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
