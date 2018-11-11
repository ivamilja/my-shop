import { OnInit, Input, Injectable } from '@angular/core';
import { ShoppingCartItem } from "./shopping-cart-item";
@Injectable({
  providedIn: 'root'
})
export class ShoppingCart implements OnInit{

  public items: ShoppingCartItem[]=[];
  public product:any[]=[];

  constructor(private itemsMap:{[productId:string]: ShoppingCartItem}){
    this.itemsMap=this.itemsMap || {};
   
    for(let productId in itemsMap){
    let item=itemsMap[productId];
    let x=new ShoppingCartItem();
    Object.assign(x, item);
    x.key=productId;
    this.items.push(x);   
  }
  }
  
  
  ngOnInit(){
    
}
    get shoppingCartTotal() {
     let count=0;
     for(let productId in this.itemsMap){
       count+=this.itemsMap[productId].quantity;
     }
     return count;
    }

    getQuantity(product){
      
      let item =this.itemsMap[product.key]; 
           return item ? item.quantity : 0;  
      
      }
    

    get totalPrice() {
      let sum=0;
      for(let productId in this.items)
        sum+=this.items[productId].totalPrice;
      return sum;
     }

    get productId(){
      return Object.keys(this.itemsMap)
    }
}