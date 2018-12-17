import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //database uzerinden product diye yeni bir kategori olusturuldu. ve girilen her deger push edildi.
  //CALISIYOR
  create(product){
    return this.db.list('/products').push(product);
  }


  //butun datalari gosterecek olan komut
  // title altina butun hepsini gosteriyor.
  //SORUN YOK
  getAll(){
    return this.db.list('/products').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  //burasi databaseden gelen kisim
  //guncelleme yapan kisim
  get(productId){
    return this.db.list('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
  
  //calisiyor
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}