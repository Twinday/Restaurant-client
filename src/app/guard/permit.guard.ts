import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermitGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRole: string[] = next.data.expectedRole;
      let permit = false;
      for (let i in expectedRole) {
        if (expectedRole[i] === localStorage.getItem('role')) {
          permit = true;
        }
      }

      if (localStorage.getItem('token') !== null && permit) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
}
