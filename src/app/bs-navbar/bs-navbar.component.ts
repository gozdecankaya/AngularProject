import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AppUser } from '../shared/models/app-user';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
   cart$;
 shoppingCartItemCount: number;

constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {}

async ngOnInit(){
 // auth.appUser$.subscribe(appUser => this.appUser = appUser); 
 
  // this.cart$ = await this.shoppingCartService.getCart();
 this.cart$ = await this.shoppingCartService.getCart();
 this.cart$.subscribe(cart => {
  this.shoppingCartItemCount = 0;
  for (let productId in cart.items){
    this.shoppingCartItemCount += cart.items[productId].quantity;

  }
 })

}
  // onceden buradan logout oluyorduk. Simdi AuthService bagladik 
  logout() {
    this.auth.logout();
  }
}
