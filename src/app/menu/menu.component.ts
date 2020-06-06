import {Component, OnInit} from '@angular/core';
import {Dish, DishServer, Ingredient, IngredientDish, IngredientDishes, MenuService} from '../shared/menu.service';
import {MatTableDataSource} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // DishControl: FormGroup | undefined;
  // tslint:disable-next-line:variable-name
  public Loading = true;
  // tslint:disable-next-line:variable-name
  public Open = true;
  id = 0;
  /*Name: string = '';
  Type: number = 0;
  Cost: number = 0;*/
  public dataSourceMenu: any;
  dataSourceIngredientDishes: any;
  dataSourceIngredients: any;
  displayedColumnsMenu: string[] = ['Id', 'Name', 'Cost', 'Count', 'UpButon', 'RemButon'];
  displayedColumnsIngredientDishes: string[] = ['id', 'NameIngredient', 'CountIngredient', 'Measure', 'Buton'];
  displayedColumnsIngredients: string[] = ['Id', 'Name', 'Available', 'Measure', 'DateManufacture', 'DateExpiration', 'Buton'];

  // tslint:disable-next-line:variable-name
  DishControl?: FormGroup;
  ingredientsDish?: FormArray;
  IngredientParams?: FormGroup;
  public isPut = true;
  constructor(private menuservice: MenuService, private fb: FormBuilder) { }

  ngOnInit() {
    /*this.DishControl = this.fb.group({
      Name: this.fb.control('', Validators.required),
      Type: this.fb.control('', Validators.required),

      Cost: this.fb.control('', Validators.required),
      IngredientsDish: this.fb.array([])
    });*/

    /*
    * в цикле для каждого ингридиента
    * this.DishControl.conrols.IngridientsDish.push(this.group({
        id: this.fb.control(''),
        Name: this.fb.control(''),
        CountIngredient: this.fb.control('', Validators.required),
        Measure: this.fb.control('')
      })
    * */
    this.menuservice.LoaderMenu().subscribe((res) => {
      this.dataSourceMenu = new MatTableDataSource(res);
      this.Loading = false;
    });
  }

  OpenAddDish() {
    this.DishControl = this.fb.group({
      Name: this.fb.control('', Validators.required),
      Type: this.fb.control('', Validators.required),

      Cost: this.fb.control('', Validators.required),
      // IngredientsDish: this.fb.array([])
    });

    this.ingredientsDish = this.fb.array([], Validators.minLength(1));

    this.dataSourceIngredientDishes = new MatTableDataSource(this.ingredientsDish.controls);
    this.menuservice.AllIngredients().subscribe((res) => {
      this.dataSourceIngredients = new MatTableDataSource(res);
      this.Open = false;
      this.isPut = false;
    });
  }

  OpenIngredient(id: number) {
    this.menuservice.GetDish(id).subscribe((res) => {
      this.DishControl = this.fb.group({
        Name: this.fb.control('', Validators.required),
        Type: this.fb.control('', Validators.required),

        Cost: this.fb.control('', Validators.required),
        // IngredientsDish: this.fb.array([])
      });
      // tslint:disable-next-line:variable-name
      this.ingredientsDish = this.fb.array([], Validators.minLength(1));
      for (let i = 0; i < res.ingredientDishes.length; i++) {
        // tslint:disable-next-line:variable-name
        this.IngredientParams = this.fb.group({
          id: this.fb.control(res.ingredientDishes[i].id),
          nameIngredient: this.fb.control(res.ingredientDishes[i].nameIngredient),
          countIngredient: this.fb.control(res.ingredientDishes[i].countIngredient, Validators.required),
          measure: this.fb.control(res.ingredientDishes[i].measure)
        });
        this.ingredientsDish.push(this.IngredientParams);
      }


      this.DishControl.setValue({
        Name: res.name,
        Type: res.type,
        Cost: res.cost,
        // IngredientsDish: this.ingredientsDish
      });

      this.dataSourceIngredientDishes = new MatTableDataSource(this.ingredientsDish.controls);
      this.menuservice.AllIngredients().subscribe((res) => {
        this.dataSourceIngredients = new MatTableDataSource(res);
        this.Open = false;
      });
      this.isPut = true;
      this.id = id;
    });
  }

  RemoveIngredient(index: number) {
    (this.ingredientsDish as FormArray).removeAt(index);
    this.dataSourceIngredientDishes = new MatTableDataSource((this.ingredientsDish as FormArray).controls);
  }

  AddIngredient(id: number) {
    if (this.dataSourceIngredientDishes.filteredData.filter((c: {
      get: (arg0: string) => { value: number; }; }) => c.get('id').value === id).length !== 1) {

      const ingrdient = this.dataSourceIngredients.filteredData.find( (c: { id: number; }) => c.id === id);
      // tslint:disable-next-line:variable-name
      this.IngredientParams = this.fb.group({
        id: this.fb.control(ingrdient.id),
        nameIngredient: this.fb.control(ingrdient.name),
        countIngredient: this.fb.control(1, Validators.required),
        measure: this.fb.control(ingrdient.measure)
      });

      this.dataSourceIngredientDishes.filteredData.push(this.IngredientParams);
      this.dataSourceIngredientDishes._updateChangeSubscription();
    } else {
      alert('Этот ингредиент уже добавлен');
    }
  }

  RemoveDish(id: number) {
    this.menuservice.DeleteDish(id).subscribe(() => {
      this.menuservice.LoaderMenu().subscribe((res) => {
        this.Loading = true;
        this.dataSourceMenu = new MatTableDataSource(res);
        this.Loading = false;
      });
    });
  }

  Save(id: number) {
    if (this.isPut) {
      this.dataSourceIngredientDishes._updateChangeSubscription();
      const temp: IngredientDishes[] = [];
      for (let i = 0; i < this.dataSourceIngredientDishes.filteredData.length; i++) {
        temp.push({
          IngredientId: this.dataSourceIngredientDishes.filteredData[i].value.id,
          CountIngredient: (this.dataSourceIngredientDishes.filteredData[i].value.countIngredient as number)
        });
      }
      const dish: DishServer = {
        id: this.id,
        name: (this.DishControl as FormGroup).controls.Name.value,
        type: (this.DishControl as FormGroup).controls.Type.value,
        cost: (this.DishControl as FormGroup).controls.Cost.value,
        ingredientDishes: temp
      };

      this.menuservice.PutDish(this.id, dish).subscribe(() => {
        this.Open = true;
        this.Loading = true;
        this.menuservice.LoaderMenu().subscribe((res) => {
          this.Loading = false;
          this.dataSourceMenu = new MatTableDataSource(res);
        });
      });
    } else {
        this.dataSourceIngredientDishes._updateChangeSubscription();
        const temp: IngredientDishes[] = [];
        for (let i = 0; i < this.dataSourceIngredientDishes.filteredData.length; i++) {
          temp.push({
            IngredientId: this.dataSourceIngredientDishes.filteredData[i].value.id,
            CountIngredient: (this.dataSourceIngredientDishes.filteredData[i].value.countIngredient as number)
        });
      }
        const dish: DishServer = {
          name: (this.DishControl as FormGroup).controls.Name.value,
          type: (this.DishControl as FormGroup).controls.Type.value,
          cost: (this.DishControl as FormGroup).controls.Cost.value,
          ingredientDishes: temp
      };

        this.menuservice.PostDish(dish).subscribe(() => {
          this.Open = true;
          this.Loading = true;
          this.menuservice.LoaderMenu().subscribe((res) => {
            this.Loading = false;
            this.dataSourceMenu = new MatTableDataSource(res);
        });
      });
    }
  }
}

