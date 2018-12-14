// bazi durumlarda login yapmadan url kismina /check-out  ya da /orders yaptigimizda kullanicisiz giris yapiyor.
//Bunun onune gecmek amaciyla auth-guard isimli bir servis olusturduk.

import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

//CanActivate neden kullanildi?
// Constructor icerisinde router olarak tanimladigimiz sey ne ise yarar?
// Asagidaki kod parcacigini tam olarak anlamaya calis.

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route,state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) return true;

      this.router.navigate (['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    });
    }
 
}
