import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
   return this.db.list('/products')
  .snapshotChanges().pipe(map(items => {            // <== new way of chaining
    return items.map(a => {
      const value = a.payload.val();
      const key = a.payload.key;
      return {key, ...value};           // or {key, ...data} in case data is Obj
    });
  }));
  }
  get(productId) {
    return this.db.object('/products/'+productId).valueChanges();
  }
  update(productId,product) {
    return this.db.object('/products/'+productId).update(product);
  }
  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
  }

