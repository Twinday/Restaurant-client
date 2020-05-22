import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

login(formData: any): Observable<void> {
  return this.http.post<void>('api/account/login', formData);
}

Register(formData: any): Observable<void> {
  return this.http.post<void>('api/account/register', formData);
}

}
