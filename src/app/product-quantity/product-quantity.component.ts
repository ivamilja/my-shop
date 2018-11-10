import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
    constructor(private shoppingCartService: ShoppingCartService) { }
  
    addToCart(product){
     this.shoppingCartService.addToCart(product);
    }
    removeFromCart(product){
      this.shoppingCartService.removeFromCart(product);
    }
   
}
