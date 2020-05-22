import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


export interface MenuDish {
    id: number;
    name: string;
    count: number;
    cost: number;
}

export interface Dish {
    DishId: number;
}

export interface NewOrder {
    date: Date;
    orderDishes: Dish[];
    status: number;
    waiterId: number;
}

export interface Order {
    id: number;
    status: number;
    waiterId: number;
    waiterLogin: string;
    cookId: number;
    cookLogin: string;
    dishes: string[];
}

@Injectable({providedIn: 'root'})
export class OrderService {

    constructor(private http: HttpClient) {}

    public menudishes: MenuDish[] = [];
    public freeOrders: Order[] = [];
    public cookingOrders: Order[] = [];
    public notifications: string[] = [];

    LoaderNotifications(): Observable<string[]> {
        return this.http.get<string[] >('api/orders/message').pipe(tap(not => this.notifications = not));
    }

    LoaderCookingOrders(): Observable<Order[]> {
        return this.http.get<Order[] >('api/orders/in-process').pipe(tap(cookingorders => this.cookingOrders = cookingorders));
    }

    LoaderFreeOrders(): Observable<Order[]> {
        return this.http.get<Order[] >('api/orders/free').pipe(tap(freeorders => this.freeOrders = freeorders));
    }

    LoaderMenu(): Observable<MenuDish[]> {
        return this.http.get<MenuDish[] >('api/dishes/menu').pipe(tap(menudishes => this.menudishes = menudishes));
    }

    LoaderNewOrder(order: NewOrder): Observable<void> {
        return this.http.post<void>('api/orders', order);
    }

    LoaderTakenOrder(order: Order): Observable<void> {
        const url = 'api/orders/' + order.id + '/accept';
        return this.http.put<void>(url, order);
    }

    LoaderCompleteOrder(order: Order): Observable<void> {
        const url = 'api/orders/' + order.id + '/ready';
        return this.http.put<void>(url, order);
    }

}
