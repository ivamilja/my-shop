import { async } from '@angular/core/testing';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

   async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getCartId();
    return this.db.object('/shopping-carts/'+cartId).valueChanges()
    .pipe(map(x=>new ShoppingCart(x['items'])))
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
    if(product!=undefined){
    let cartId = await this.getCartId();
    let item1$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
   item1$.snapshotChanges().pipe(take(1)).subscribe(l=>{
     
    if(!l.payload.exists()) item1$.set({title:product.title,imageUrl:product.imageUrl,price:product.price, quantity:1});
    else {
    const data= l.payload.val();
    let Q=data['quantity'];
     item1$.update({quantity: Q+1 });
   }
   })
}
  }
async removeFromCart(product) {
  if(product!=undefined){
  let cartId = await this.getCartId();
  let item1$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
 item1$.snapshotChanges().pipe(take(1)).subscribe(l=>{
   
   if(!l.payload.exists()) item1$.set({title:product.title,imageUrl:product.imageUrl,price:product.price, quantity:1});
   else {
    const data= l.payload.val();
    let Q=data['quantity'];
    if(Q===1) 
      item1$.remove();
    else
    item1$.update({quantity: Q-1 });
}
 })
}
}
  
async clearCart(){
  let cartId=await this.getCartId();
  this.db.object('/shopping-carts/'+cartId+'/items').remove();
}

}