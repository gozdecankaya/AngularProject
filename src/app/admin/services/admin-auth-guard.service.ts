import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/observable';



@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

canActivate(): Observable<boolean> {

  return this.auth.user$
  .switchMap(user => this.userService.get(user.uid).valueChanges())
    .map(appUser => appUser.isAdmin);

  // return this.auth.appUser$
  // .map(appUser => appUser.isAdmin);


  }
}
