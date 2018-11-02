import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  products: any[]=[];
  filteredProduct:any[];
 quantity:number;
  category: string;
  cart:any;
  subscription: Subscription;

  constructor(productService: ProductService,  route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
   
   
    productService.getAll().subscribe(products=>{
       this.products=products;
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        this.filteredProduct=(this.category)? this.products.filter(p=>p.category===this.category): this.products;
      });

    });

   
   }
   async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart=> this.cart=cart)
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

}
