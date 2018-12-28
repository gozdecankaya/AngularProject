import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../../../shared/models/Product';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input('product') product: Product;

  shoppingCartItemCount: number;
  item;
  subscription: Subscription;
  productId: string;
  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {

    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
    console.log("tiklandi");
  }
}
