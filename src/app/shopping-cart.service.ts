import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/Product';
import { take } from 'rxjs/operators';
import { ShoppingCartProduct } from './models/shoppingCartProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   async getCart() {
     let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts' + cartId);
  }

  //promise kullandigimizda getCart daki cartId de string oluyor.
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;


    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }


  async addToCart(product: Product) {

    //duzelt
    let cartId = await this.getOrCreateCartId();
    console.log("cartId is ", cartId);
    let item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item.valueChanges().pipe(take(1)).subscribe((data: ShoppingCartProduct) => {
      console.log("this is emitted from item$", data);
      if (data)
        item.update({ quantity: data.quantity + 1 });
      else
        item.set({ product: product, quantity: 1 });
    });
  }
  
  //duzelt
  async removeFromCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    console.log("cartId is ", cartId);
    let item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item.valueChanges().pipe(take(1)).subscribe((data: ShoppingCartProduct) => {
      console.log("this is emitted from item$", data);
      if (data)
        item.update({ quantity: data.quantity - 1 });
      else
        item.set({ product: product, quantity: 1 });
    });
  }

  // private getItem(cartId: string, productId: string) {
  //   return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  // }
  //   async getCart() {
  //   const cartId = await this.getOrCreateCartId();

  //   return this.db.list('/shopping-carts' + cartId);
  // }


  // async addToCart(product: Product){
  //   this.updateItem(product, 1);


  // }


  // private async updateItem(product: Product, change: number){
  //   const cartId = await this.getOrCreateCartId();
  //   const item = this.getItem(cartId, product.key);
  // item.valueChanges().pipe(take(1)).subscribe((data: ShoppingCartProduct) => {
  //   if (!data) {
  //     item.set({
  //       product: product,
  //       quantity: 1
  //     });
  //   } else {
  //     const quantity = data.quantity + change;
  //     if (quantity === 0) {
  //       item.remove();
  //     } else {
  //       item.update({ product: product, quantity: data.quantity + change });
  //     }
  //   }
  // });
  // }

}
