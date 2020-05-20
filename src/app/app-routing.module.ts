import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninpageComponent } from './signinpage/signinpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { AddIngFormComponent } from './addIngForm/addIngForm.component';
import { IngTableComponent } from './ingTable/ingTable.component';
import { NeedIngTableComponent } from './needIngTable/needIngTable.component';
import { CookFormComponent } from './cook-form/cook-form.component';
import { AddOrderComponent } from './addOrder/addOrder.component';
import { UsedDishesComponent } from './used-dishes/used-dishes.component';
import { MenuComponent } from './menu/menu.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AddIngredientAvailableComponent } from './add-ingredient-available/add-ingredient-available.component';
import { WaiterNotificationsComponent } from './waiter-notifications/waiter-notifications.component';
import { PermitGuard } from './guard/permit.guard';


const routes: Routes = [
  { path: '', component: SigninpageComponent},
  { path: 'home',
    component: HomepageComponent,
    canActivate: [PermitGuard], data: {expectedRole: ['admin', 'cook', 'waiter', 'provisor']},
    children: [

      { path: 'registration', component: SignupComponent, canActivate: [PermitGuard], data: {expectedRole: ['admin']} },
      { path: 'add-product', component: AddIngFormComponent, canActivate: [PermitGuard], data: {expectedRole: ['provisor']} },
      { path: 'display-product', component: IngTableComponent,
      canActivate: [PermitGuard], data: {expectedRole: ['admin', 'cook', 'provisor']} },
      { path: 'list-buying', component: NeedIngTableComponent,
      canActivate: [PermitGuard], data: {expectedRole: ['admin', 'cook', 'provisor']} },
      { path: 'current-orders', component: CookFormComponent, canActivate: [PermitGuard], data: {expectedRole: ['cook']} },
      { path: 'new-order', component: AddOrderComponent, canActivate: [PermitGuard], data: {expectedRole: ['waiter']} },
      { path: 'released-dishes', component: UsedDishesComponent, canActivate: [PermitGuard], data: {expectedRole: ['admin']} },
      { path: 'menu', component: MenuComponent, canActivate: [PermitGuard], data: {expectedRole: ['admin']} },
      { path: 'revenue', component: RevenueComponent, canActivate: [PermitGuard], data: {expectedRole: ['admin']} },
      { path: 'buy-ingredient', component: AddIngredientAvailableComponent,
      canActivate: [PermitGuard], data: {expectedRole: ['provisor']} },
      { path: 'message', component: WaiterNotificationsComponent, canActivate: [PermitGuard], data: {expectedRole: ['waiter']} }
    ]},
  { path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
