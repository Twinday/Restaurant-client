import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Ingredient {
    id?: number;
    name: string;
    measure: string;
    available: number;
    dateManufacture: Date;
    dateExpiration: Date;
    }

export interface UsedIngredient {
  name: string;
  count: number;
}

export interface UsedDish {
  name: string;
  count: number;
}

@Injectable({providedIn: 'root'})
export class IngService {

  public ingredients: Ingredient[] = [];
  public needingredients: Ingredient[] = [];
  public addingredients: Ingredient[] = [];
  public usedingredients: UsedIngredient[] = [];
  public useddish: UsedDish[] = [];
  public rev = 0;

constructor(private http: HttpClient) {}

 LoaderAddIng(): Observable<void> {
  return this.http.post<void>('api/ingredients', this.addingredients[0]);
}

LoaderUsedDish(d1: Date, d2: Date ): Observable<UsedDish[]> {
  let startday = d1.getDate() + '';
  let endday = d2.getDate() + '';
  let startmounth = d1.getMonth() + 1 + '';
  let endmounth = d2.getMonth() + 1 + '';

  if (d1.getDate() < 9) {
  startday = '0' + d1.getDate();
  }
  if (d2.getDate() < 9) {
    endday = '0' + d2.getDate();
  }
  if (d1.getMonth() < 9) {
    startmounth = '0' + (d1.getMonth() + 1);
  }
  if (d2.getMonth() < 9) {
    endmounth = '0' + (d2.getMonth() + 1);
  }
  const url = 'api/dishes/sold/' + startday + '.' + startmounth + '.'
  + d1.getFullYear() + '-' + endday + '.' + endmounth + '.' + d2.getFullYear();
  return this.http.get<UsedDish[] >(url).pipe(tap(ingredients => this.useddish = ingredients));
  }

  LoaderRevenue(d1: Date, d2: Date ): Observable<any> {
    let startday = d1.getDate() + '';
    let endday = d2.getDate() + '';
    let startmounth = d1.getMonth() + 1 + '';
    let endmounth = d2.getMonth() + 1 + '';

    if (d1.getDate() < 9) {
      startday = '0' + d1.getDate();
    }
    if (d2.getDate() < 9) {
      endday = '0' + d2.getDate();
    }
    if (d1.getMonth() < 9) {
      startmounth = '0' + (d1.getMonth() + 1);
    }
    if (d2.getMonth() < 9) {
      endmounth = '0' + (d2.getMonth() + 1);
    }

    const url = 'api/orders/revenue/' + startday + '.' + startmounth + '.'
    + d1.getFullYear() + '-' + endday + '.' + endmounth + '.' + d2.getFullYear();
    return this.http.get<any>(url).pipe(tap(r => this.rev = r));
  }


LoaderUsedIng(d1: Date, d2: Date ): Observable<UsedIngredient[]> {
  let startday = d1.getDate() + '';
  let endday = d2.getDate() + '';
  let startmounth = d1.getMonth() + 1 + '';
  let endmounth = d2.getMonth() + 1 + '';

  if (d1.getDate() < 9) {
    startday = '0' + d1.getDate();
  }
  if (d2.getDate() < 9) {
    endday = '0' + d2.getDate();
  }
  if (d1.getMonth() < 9) {
    startmounth = '0' + (d1.getMonth() + 1);
  }
  if (d2.getMonth() < 9) {
    endmounth = '0' + (d2.getMonth() + 1);
  }

  const url = 'api/ingredients/used/' + startday + '.' + startmounth +
  '.' + d1.getFullYear() + '-' + endday + '.' + endmounth + '.' + d2.getFullYear();
  return this.http.get<UsedIngredient[] >(url).pipe(tap(ingredients => this.usedingredients = ingredients));
}

  LoaderIng(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[] >('api/ingredients').pipe(tap(ingredients => this.ingredients = ingredients));
  }

  LoaderNeedIng(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[] >('api/ingredients/low').pipe(tap(ingredients => this.needingredients = ingredients));
  }

  LoaderUpdateingredient(ing: Ingredient): Observable<void> {
    const url = 'api/ingredients/' + ing.id;
    return this.http.put<void>(url, ing);
  }

}
