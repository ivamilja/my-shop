import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product;
@Input('show-actions') showActions=true;
@Input('shopping-cart') shoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product){
   this.shoppingCartService.addToCart(product);
  }
  removeFromCart(product){
    this.shoppingCartService.removeFromCart(product);
  }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item =this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
