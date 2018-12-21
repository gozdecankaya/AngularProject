import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/Product';
import { take, map } from 'rxjs/operators';
import { ShoppingCartProduct } from './models/shoppingCartProduct';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

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

  // getCart metodu getOrCreateCart metoduna gidip localstorage deki 
  async getCart() {
    let cartId = await this.getOrCreateCartId();
  // return this.db.object('/shopping-carts/' + cartId);
  return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(
        map(x => new ShoppingCart(x.payload.val()['items']))
      );


  //  return this.db.object('/shopping-carts/' + cartId).valueChanges()
  //  .map(x => new ShoppingCart(x.items));
  }
  

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
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

    this.updateItemQuantity(product, 1);
  }


  async removeFromCart(product: Product) {

    this.updateItemQuantity(product, -1);
  }


  // quantitylerimizi update ediyor. getItem gidiyor. oda databasede tutuyor.
  private async updateItemQuantity(product: Product, change: number) {

    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key);
    console.log("cartId is sd ", cartId);
    // let item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item.valueChanges().pipe(take(1)).subscribe((data: ShoppingCartProduct) => {
      console.log("this is emitted from item$", data);
     // let quantity = (data.quantity || 0) + change;
      if (data)
        item.update({ quantity: data.quantity + change, product: product});
      else
        item.update({ product: product, quantity: change });


        // item$.take(1).subscribe(item => {
        //   let quantity = (item.quantity || 0) + change;
        //   if (quantity === 0) item$.remove();
        //   else item$.update({ 
        //     title: product.title,
        //     imageUrl: product.imageUrl,
        //     price: product.price,
        //     quantity: quantity
        //   });

    });
  }

}
