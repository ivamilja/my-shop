import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  item: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  getAll() {
  return  this.db.list('/categories',ref => ref.orderByChild('name')     
    ).snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const value = a.payload.val();
        const key = a.payload.key;
        return {key, ...value};           // or {key, ...data} in case data is Obj
      });
    }));
  }
}
