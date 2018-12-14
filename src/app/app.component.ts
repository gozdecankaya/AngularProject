import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// title kismini silip burada yeni bir constructor yaratip
//daha sonrasinda olusturdugumuz constructor icerisine user girisi yapildiktan sonra sayfalar arasi gecis gibi dusunebiliriz.
//check-out sayfasindayken anasayfaya gecerse ne olur gibisinden???
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router){
    auth.user$.subscribe(user =>{
      if (user){
        userService.save(user);
          
          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
      }
    })
  }
}
