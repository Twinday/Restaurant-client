import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-header></app-header>
              <div class="body"><router-outlet></router-outlet></div>
              <app-footer></app-footer>`,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Restaurant';
}
