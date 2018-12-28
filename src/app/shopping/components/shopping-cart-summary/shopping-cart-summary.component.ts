import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  
  @Input('cart') cart: ShoppingCart;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) {


  }
}
