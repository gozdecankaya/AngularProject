import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/Product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';

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
