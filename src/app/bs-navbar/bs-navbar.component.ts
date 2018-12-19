import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireObject } from 'angularfire2/database';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
 // cart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {}

async ngOnInit(){
 // auth.appUser$.subscribe(appUser => this.appUser = appUser); 
 
 //this.cart$ = await this.shoppingCartService.getCart();
 let cart$ = await this.shoppingCartService.getCart();
 cart$.valueChanges().subscribe(cart => {
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
