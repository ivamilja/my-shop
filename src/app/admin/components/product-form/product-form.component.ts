import { ProductService } from 'shared/services/product.service';
import { AngularFireModule } from '@angular/fire';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  categories$;
  product={};
  id;

  constructor(
    public categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
      
    }

  ngOnInit() {
    this.categories$= this.categoryService.getAll();
    this.id=this.route.snapshot.paramMap.get('id');
      if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p =>this.product=p);
  }

  save(product) {
    if(this.id)
    this.productService.update(this.id,product);
    else  this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (confirm('Are you sure you want to delete this product? ')) {
    this.productService.delete(this.id);

    this.router.navigate(['/admin/products']);
  } else return;
  }

}
