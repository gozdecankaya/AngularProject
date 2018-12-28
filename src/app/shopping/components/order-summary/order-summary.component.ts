import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { OrderService } from 'src/app/shared/services/order.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  //@Input('order') order: Order;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  cart$: Observable<any>;
  id: string;
  currentOrderId: string;
  order: any;
  shippingName: string;
  city: string;
  date;
  items: any[];



  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {


    this.currentOrderId = this.route.snapshot.paramMap.get('id');

    this.cart$ = orderService.getOrders();
    this.cart$.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);

        if (this.currentOrderId === data[i].key) {
          console.log(data[i].datePlaced);
          this.shippingName = data[i].shipping.name;
          this.city = data[i].shipping.city;
          this.date = data[i].datePlaced;

          this.items = data[i].items.map(i => {
            console.log(i.product.title);

            return {
              product: i.product,
              // product: {
              //   title: i.product.title,
              //   imageUrl: i.product.imageUrl,
              //   price: i.product.price
              // },
              quantity: i.quantity,
              totalPrice: i.totalPrice

            }
          })


        }

      }
    })


  }


  async ngOnInit() { }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

}
