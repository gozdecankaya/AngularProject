import 'rxjs/add/operator/switchMap';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {


  orders$;
  currentOrderId;
  

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
     

   
  }

}

