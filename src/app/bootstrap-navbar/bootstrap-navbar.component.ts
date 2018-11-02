import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnInit{
 appUser: AppUser;
 shoppingCartTotal:number;
  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
    let cart$= await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart=>{
      this.shoppingCartTotal=0;
     for(let productId in cart.items)
       this.shoppingCartTotal+=cart.items[productId].quantity
    })
  }
  logout() {
    this.auth.logout();
  }
}
