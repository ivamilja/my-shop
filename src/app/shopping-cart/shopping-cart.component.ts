import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  carts$:Observable<ShoppingCart>
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.carts$= await this.shoppingCartService.getCart();
}
clearCart() {
  this.shoppingCartService.clearCart();
}
}
