import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {

    
    }
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }



}
