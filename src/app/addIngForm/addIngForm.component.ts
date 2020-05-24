import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {IngService, Ingredient} from '../shared/ing.service';

@Component({
  selector: 'app-add-ing-form',
  templateUrl: './addIngForm.component.html',
  styleUrls: ['./addIngForm.component.css']
})
export class AddIngFormComponent implements OnInit {

  Available: number;
  Name: string;
  Measure: string;
  DateManufacture: Date;
  DateExpiration: Date;

  private loading = true;

  SaveIng() {
    const tmp: Ingredient = {
      name: this.Name,
      available: this.Available,
      measure: this.Measure,
      dateExpiration: this.DateExpiration,
      dateManufacture: this.DateManufacture};

    tmp.dateExpiration.setDate(tmp.dateExpiration.getDate() + 1);
    tmp.dateManufacture.setDate(tmp.dateManufacture.getDate() + 1);
    this.ingservice.addingredients.push(tmp);
    this.ingservice.LoaderAddIng().subscribe(() => {this.loading = false; });

  }


  ChangeName(value: string) { this.Name = value; }

  ChangeMeasure(value: string) { this.Measure = value; }

  ChangeDateManufacture(event: MatDatepickerInputEvent<Date>) {
    this.DateManufacture = new Date(`${event.value}`);
  }

  ChangeDateExpiration(event: MatDatepickerInputEvent<Date>) {
    this.DateExpiration = new Date(`${event.value}`);
  }

  ChangeAvailable(value: number) {this.Available = value; }

  constructor(public ingservice: IngService) {
    this.Available = 1;
    this.Measure = '';
    this.Name = '';
    this.DateManufacture = new Date();
    this.DateExpiration = new Date();
  }

  ngOnInit() {
  }

}
