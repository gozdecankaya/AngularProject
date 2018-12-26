import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from '../shared/models/Product';
import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../shared/models/shopping-cart-item';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../shared/models/shopping-cart';


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

  // clearCart(){
  //   this.shoppingCartService.clearCart();
  //   console.log("tiklandi");
  // }
}
