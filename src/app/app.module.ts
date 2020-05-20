import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngTableComponent } from './ingTable/ingTable.component';
import { NeedIngTableComponent } from './needIngTable/needIngTable.component';
import { AddIngFormComponent } from './addIngForm/addIngForm.component';

import { MatButtonModule, MatIconModule, MatCardModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule } from '@angular/material/';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {Routes, RouterModule} from '@angular/router';
import { SigninpageComponent } from './signinpage/signinpage.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { CookFormComponent } from './cook-form/cook-form.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SoldIngredientsComponent } from './sold-ingredients/sold-ingredients.component';
import { AddIngredientAvailableComponent } from './add-ingredient-available/add-ingredient-available.component';
import { AddOrderComponent } from './addOrder/addOrder.component';
import { UsedDishesComponent } from './used-dishes/used-dishes.component';
import { MenuComponent } from './menu/menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RevenueComponent } from './revenue/revenue.component';
import { WaiterNotificationsComponent } from './waiter-notifications/waiter-notifications.component';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './guard/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    SigninpageComponent,
    HomepageComponent,
    PagenotfoundComponent,
    IngTableComponent,
    NeedIngTableComponent,
    AddIngFormComponent,
    AddOrderComponent,
    CookFormComponent,
    SoldIngredientsComponent,
    AddIngredientAvailableComponent,
    UsedDishesComponent,
    MenuComponent,
    RevenueComponent,
    WaiterNotificationsComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
