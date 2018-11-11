import { ShoppingCart } from './shopping-cart';
import { OnInit } from '@angular/core';
export class Order implements OnInit{
    date: number;
    items:any[]=[];

    constructor(public userId:string, public shipping:any, shoppingCart: ShoppingCart){
        this.date=new Date().getTime();

        this.items=shoppingCart.items.map(i=>{
            return {
              product: {
                title: i.title,
                imageUrl:i.imageUrl,
                price:i.price
              },
              quantity:i.quantity,
              totalPrice:i.totalPrice
            }
          })
    }
    ngOnInit(){
       
    }
}