import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

  products: any[]=[];
  filteredProduct:any[];
 
  category: string;

  constructor(productService: ProductService,  route: ActivatedRoute) {
    productService.getAll().subscribe(products=>{
      
      this.products=products;
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        this.filteredProduct=(this.category)? this.products.filter(p=>p.category===this.category): this.products;
      });

    });

   
   }

 

}
