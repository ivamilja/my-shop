import { ShoppingCart } from './../models/shopping-cart';
import {  Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products: any[]=[];
  filteredProduct:any[];
 quantity:number;
  category: string;
  cart$:Observable<ShoppingCart>

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {}
   

   private applyFilter(){
    this.filteredProduct=(this.category)? this.products.filter(p=>p.category===this.category): this.products;
   }

   private populateProduct(){
    this.productService.getAll().subscribe(products=>{
      this.products=products;
     this.route.queryParamMap.subscribe(params=>{
       this.category=params.get('category');
     this.applyFilter();
     });
   });
   }

   async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();

   }

  

}
