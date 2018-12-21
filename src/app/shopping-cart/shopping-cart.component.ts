import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/Product';
import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';


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


    // let cart$ = await this.shoppingCartService.getCart();
    // cart$.subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   for (this.productId in cart.items) {
    //     this.shoppingCartItemCount += cart.items[this.productId].quantity;
    //   }

    //   this.itemTitle = cart.items[this.productId].product.title;
    //   this.itemPrice = cart.items[this.productId].quantity;
    
   // })

   

  }

}
