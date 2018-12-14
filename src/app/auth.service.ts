// navbar.component.ts ya da login.component.ts lerde tanimladigimiz login ve ya logout metotlarinin
//bir servis yardimiyla cekilmesini saglamak icin kuruldu.

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:  Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login(){

    //Burada kullanilan yontem auth-guard servisini yukledigimizden sonra yazildi.
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    //  
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  
// get appUser$(): Observable <AppUser> {
//     return this.user$
//     .switchMap(user => {
//       if (user) return this.userService.get(user.uid).valueChanges;
//       return Observable.of(null);
//     }); 
//   } 
  
}
