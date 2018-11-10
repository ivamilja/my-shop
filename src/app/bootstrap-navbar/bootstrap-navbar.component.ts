import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnInit{
 appUser: AppUser;
 shoppingCartTotal:number;
 cart$: Observable<ShoppingCart>
  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
     this.cart$= await this.shoppingCartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
