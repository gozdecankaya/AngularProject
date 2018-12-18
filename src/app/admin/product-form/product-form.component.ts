import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operator/take';
import { Product } from 'src/app/models/Product';
import { take } from 'rxjs/operator/take';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //PRODUCTFORMCOMPONENT YENI EKLENEN SAYFA
  
  categories$;
  categories: any[];
  product = {};
  id;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {


    //categorileri listview cekiyor.        
    //CALISIYOR
    this.categories$ = categoryService.getAll();



    //id yi donduruyor.
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id && this.id != 'new') {
      productService.get(this.id)
        .take(1)
        .subscribe(product => {
          this.product = product;
        //  console.log(this.product);
        });
    } else {
      this.product = {};
    }


  }
  ngOnInit() { }


  // burada girmis oldugumuz veriler database kayit edilir 
  //CALISIYOR
  save(product) {

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  //calisiyor
  delete() {
    if (confirm('Are you sure you want to delete this product')) {
      this.productService.delete(this.id);
    }
    this.router.navigate(['/admin/products']);
  }

}