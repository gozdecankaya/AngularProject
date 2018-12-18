import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { DataTableResource } from 'angular5-data-table';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { snapshotChanges } from 'angularfire2/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
   //products$;

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number = 0;

  constructor(private productService: ProductService) {

    //this.products = this.productService.getAll();

    //calisiyor. Data table icine productleri getirdi.
    this.subscription = this.productService.getAll()
      .subscribe((products: Product[]) => { this.filteredProducts = this.products = products;
        this.initializeTable(this.products);
      });

      
  }
  private initializeTable(products: Product[]) {

    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }


  ngOnInit() {
  }

 // filter calismiyor

  reloadItems(params) {
    if (!this.tableResource) return

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}