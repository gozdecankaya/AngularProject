import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // products$;
  products: Product[];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    // this.products$ = productService.getAll();


    // videoda parantez ici products direk onu Product[] esitliyoruz.
    productService
      .getAll()
      .switchMap((products:Product[]) => {
      //  console.log('this IS WHAT WE GET FROM SWITCH MAP',products);
        this.products = products;
        return route.queryParamMap;
      })
      //category leri donduruyor.
      .subscribe(params => {
        this.category = params.get('category');

        // calisiyor
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;

      });
  }
  async ngOnInit() {
     this.subscription = (await this.shoppingCartService.getCart())
          .subscribe(cart => this.cart = cart);
  }
  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
}
