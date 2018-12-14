import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  //categoriler get metoduyla db listesinden cekilir. Ancak angularFireList yapmazsam async pipe hata veriyor.
  //CALISIYOOOR. VALUECHANGES()
  
  getCategories(){
   // return this.db.list('/categories').valueChanges(); 

   return this.db.list('/categories').snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
  }
} 