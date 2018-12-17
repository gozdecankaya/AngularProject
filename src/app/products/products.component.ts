import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  // products$;
  products: Product[];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
  ) {

    // asagidaki sekilde calisiyor ancak filter yapmaya calisirsak
    // yani asagidaki metoda cevirirsek calismiyor

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
}
