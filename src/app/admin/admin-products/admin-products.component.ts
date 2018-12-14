import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  //product tarafina girdigimiz butun datalarin gozukmesi gerekiyor.
  //title-price yazan kisim
  //CALISIYOR.

  constructor(private productService: ProductService) { 

    this.products$ = this.productService.getAll();
    this.products$.subscribe( (data) => {
      console.log('THIS IS PRODUCTS$ data',data);
    });
  }

  ngOnInit() {
  }

}