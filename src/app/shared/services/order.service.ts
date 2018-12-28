import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/render3';
import { AngularFireDatabase } from 'angularfire2/database';

import { ShoppingCartService } from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public db: AngularFireDatabase,
    public shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  getOrdersByUser(userId: string){
    return this.db.list('/orders', query => 
    query.orderByChild('userId').equalTo(userId)
    ).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }


}
