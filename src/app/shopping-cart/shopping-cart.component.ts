import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartItemCount: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;

      }
    })

  }

}
