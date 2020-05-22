import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Menu {
  id: number;
  name: string;
  cost: number;
  count: number;
}

export interface IngredientDishes {     // Для отправки на сервер
  IngredientId: number;
  CountIngredient: number;
}

export interface IngredientDish {
  id: number;
  nameIngredient: string;
  countIngredient: number;
  measure: string;
}

export interface Dish {
  id: number;
  name: string;
  type: number;
  cost: number;
  ingredientDishes: IngredientDish [];
}



export interface DishServer {
  id?: number;
  name: string;
  type: number;
  cost: number;
  ingredientDishes: IngredientDishes[];
}

export interface Ingredient {
  id: number;
  name: string;
  measure: string;
  available: number;
  dateManufacture: Date;
  dateExpiration: Date;
}

@Injectable({providedIn: 'root'})
export class MenuService {

  constructor(private http: HttpClient) {

  }

  LoaderMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/Dishes/menu');
  }

  GetDish(id: number): Observable<Dish> {
    return this.http.get<Dish>('/api/Dishes/' + id);
  }

  AllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('/api/Ingredients');
  }

  // tslint:disable-next-line:no-shadowed-variable variable-name
  PutDish(id: number, Dish: DishServer): Observable<void> {
    return this.http.put<void>('/api/Dishes/' + id, Dish);
  }

  DeleteDish(id: number) {
    return this.http.delete('/api/Dishes/' + id);
  }

  // tslint:disable-next-line:no-shadowed-variable variable-name
  PostDish(Dish: DishServer): Observable<void> {
    return this.http.post<void>('/api/Dishes', Dish);
  }
}
