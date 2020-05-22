import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

  loginName: string | null = localStorage.getItem('unique_name');

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginName = localStorage.getItem('unique_name');
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('unique_name');
    localStorage.removeItem('role');
    this.loginName = localStorage.getItem('unique_name');
    return this.router.navigateByUrl('/');

  }

}
