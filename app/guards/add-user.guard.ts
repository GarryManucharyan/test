import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsersDataService } from '../sevices/users-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserGuard implements CanActivate {
  constructor(private dataService: UsersDataService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(route);
      // console.log(state);
      if (!this.dataService.isAbleAddNewUser) alert(`we can't have, more users than ${this.dataService.maxUsersCount}`)
    return this.dataService.isAbleAddNewUser;
  }
}
