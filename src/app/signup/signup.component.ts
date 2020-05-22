import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  formModel = {
    Login: '',
    Password: '',
    Name: '',
    Role: ''
  };

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  Register(form: NgForm) {
    this.service.Register(form.value).subscribe(
      (res: any) => {
        alert('Регистрация прошла успешно.');
      },
      (err: Error) => {
        alert('Ошибка регистрации...');
      }
    );
  }

}
