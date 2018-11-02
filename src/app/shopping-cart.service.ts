import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db:AngularFireDatabase) { }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

   async getCart() {
    let cartId = await this.getCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

 private async getCartId() {
    let cartId=localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create();
        localStorage.setItem('cartId', result.key);
       return  result.key;
      }
      return cartId;
  }
  async addToCart(product) {
    let cartId = await this.getCartId();
    let item1$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
   item1$.snapshotChanges().pipe(take(1)).subscribe(l=>{
     
     if(!l.payload.exists()) {item1$.set({product:product, quantity:1});
     console.log('ejj'+l);
   }else {
     let o=JSON.stringify(l.payload);
     let q=+o.charAt(o.length-2);
  
     item1$.update({quantity: q+1 });
    
   }
   })
}
async removeFromCart(product) {
  let cartId = await this.getCartId();
  let item1$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
 item1$.snapshotChanges().pipe(take(1)).subscribe(l=>{
   
   if(!l.payload.exists()) item1$.set({product:product, quantity:1});
   else {
   let o=JSON.stringify(l.payload);
   let q=+o.charAt(o.length-2);

   item1$.update({quantity: q-1 });
 }})
}
}
