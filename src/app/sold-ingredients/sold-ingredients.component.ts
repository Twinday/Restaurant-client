import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {IngService, UsedIngredient} from '../shared/ing.service';

@Component({
  selector: 'app-sold-ingredients',
  templateUrl: './sold-ingredients.component.html',
  styleUrls: ['./sold-ingredients.component.css']
})
export class SoldIngredientsComponent implements OnInit {

  constructor(public ingservice: IngService) {
    this.startDate = new Date();
    this.endDate = new Date();
   }

  startDate: Date;
  endDate: Date;
  private Loading = true;
  myIng: UsedIngredient[] = [];

  LoadIng() {
    this.ingservice.LoaderUsedIng(this.startDate, this.endDate).subscribe((z) => {
      this.myIng = z;
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
