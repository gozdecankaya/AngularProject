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

  // getCart metodu getOrCreateCart metoduna gidip localstorage deki 
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    // return this.db.object('/shopping-carts/' + cartId);
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(
        map(x => new ShoppingCart(x.payload.val()['items']))
      );

  }
  async addToCart(product: Product) {

    this.updateItemQuantity(product, 1);
  }


  async removeFromCart(product: Product) {

    this.updateItemQuantity(product, -1);
  }

  // async clearCart(){
  //   let cartId = await this.getOrCreateCartId();
  //   this.db.object('/shopping-cart/' + cartId + '/items').remove();
  // }



  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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




  // quantitylerimizi update ediyor. getItem gidiyor. oda databasede tutuyor.
  private async updateItemQuantity(product: Product, change: number) {

    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key);
    // console.log("cartId is sd ", cartId);
    // let item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item.valueChanges().pipe(take(1)).subscribe((data: ShoppingCartProduct) => {
      console.log("this is emitted from item$", data);
      // let quantity = (data.quantity || 0) + change;
      
      if (data){
      item.update({ quantity: data.quantity + change, product: product });
     let quantity = data.quantity + change;
      if (quantity === 0) item.remove();
      else {
      item.update({
        product: product,
        quantity: data.quantity + change
      })
    }

   } //data yoksa
      else
        item.update({ product: product, quantity: change });

    });
  }

}
