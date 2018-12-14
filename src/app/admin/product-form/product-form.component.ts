import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { AngularFireList } from 'angularfire2/database';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //PRODUCTFORMCOMPONENT YENI EKLENEN SAYFA

  categories$;
  product = {};
  



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {


    //categorileri listview cekiyor.        CALISIYOR
    this.categories$ = categoryService.getCategories();



    //aslinda guncellemeyi yapan yer olmasi gerekiyor. 
    //edit yapinca geliyor ama icerik gozukmuyor.
    //idlerin url kismina geldigi yer


    //ustteki metot olmazsa console id yazamiyoruz. Calisiyor ama ne is yapiyor ? 
     let id = this.route.snapshot.paramMap.get('id');
    if (id) productService.get(id).take(1)
    .subscribe(product => this.product = product);
    console.log(id);

    //CALISMIYOR
    // if(this.id && this.id != 'new'){
    //   productService.get(this.id).take(1).subscribe(p => this.product = p);
    //   console.log(this.product);
    // } else {
    //   this.product = {};
    // }   

  }
  ngOnInit() {}


  // burada girmis oldugumuz veriler database kayit edilir 
  //CALISIYOR
  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


  delete() {

  }

}