import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from 'src/app/shared/models/Product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // products$;
  products: Product[];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    // this.products$ = productService.getAll();

  }
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    // videoda parantez ici products direk onu Product[] esitliyoruz.
    this.productService
      .getAll()
      .switchMap((products: Product[]) => {
        //  console.log('this IS WHAT WE GET FROM SWITCH MAP',products);
        this.products = products;
        return this.route.queryParamMap;
      })
      //category leri donduruyor.
      .subscribe(params => {
        this.category = params.get('category');

        this.applyFilter();

      });
  }

  private applyFilter() {
    // calisiyor
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

}
