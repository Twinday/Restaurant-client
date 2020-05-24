import { Component, OnInit } from '@angular/core';
import {IngService, Ingredient} from '../shared/ing.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-ingredient-available',
  templateUrl: './add-ingredient-available.component.html',
  styleUrls: ['./add-ingredient-available.component.css']
})
export class AddIngredientAvailableComponent implements OnInit {

  constructor(public ingservice: IngService) { }
  private loading = true;
  ingList: Ingredient[] = [];
  selected = '';
  selectedIng: string[] = [];
  selectedIngredient: Ingredient[] = [];


  ChangeDateManufacture(event: MatDatepickerInputEvent<Date>, ing: Ingredient) {
    ing.dateManufacture = new Date(`${event.value}`);
}

  ChangeDateExpiration(event: MatDatepickerInputEvent<Date>, ing: Ingredient) {
    ing.dateExpiration = new Date(`${event.value}`);
  }


  addselected() {
    if (!this.selectedIng.includes(this.selected)) {
      this.selectedIng.push(this.selected);
      for (let i of this.ingList) {
        if (i.name === this.selected) {
          this.selectedIngredient.push(i);
        }
      }
    }
    }

    changeValue(ing: Ingredient, num: number) {
      ing.available = num;
    }

    updateIng(ing: Ingredient) {
      ing.dateExpiration.setDate(ing.dateExpiration.getDate() + 1);
      ing.dateManufacture.setDate(ing.dateManufacture.getDate() + 1);
      this.ingservice.LoaderUpdateingredient(ing).subscribe(() => {this.loading = false; });
    }

  ngOnInit() {
    this.ingservice.LoaderNeedIng().subscribe((z) => {
      this.ingList = z;
      this.loading = false;
    });
  }

}
