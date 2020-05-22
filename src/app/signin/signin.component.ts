import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as jwt_decode from 'jwt-decode';


interface DecodedToken {
  UserID: string;
  unique_name: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  formModel = {
    Login: '',
    Password: ''
  };

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        const decod = jwt_decode(res.token) as DecodedToken;
        localStorage.setItem('UserID', decod.UserID);
        localStorage.setItem('unique_name', decod.unique_name);
        localStorage.setItem('role', decod.role);

        return this.router.navigateByUrl('/home');
      },
      err => {
        alert('Неверный логин или пароль.');
      }
    );
  }

}
