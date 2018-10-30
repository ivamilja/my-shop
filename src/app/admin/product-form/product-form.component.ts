import { ProductService } from './../../product.service';
import { AngularFireModule } from '@angular/fire';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(public categoryService: CategoryService,private producService: ProductService) { 

  }

  ngOnInit() {
    this.categories$= this.categoryService.getCategories();
  }

  save(product) {
    this.producService.create(product);
  }

}
