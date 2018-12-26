import { Product } from '../models/product';

export class ShoppingCartProduct {

    constructor(public product: Product, public quantity: number) {
    }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}
