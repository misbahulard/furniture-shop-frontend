import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { ProductService } from '../product.service'
import { CategoryService } from '../category.service';

import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  id: number;
  category: Category;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProductsByCategory();
    this.getCategory();
  }

  getProductsByCategory(): void {
    this.productService.getProductsByCategory(this.id)
      .subscribe(products => { this.products = products });
  }

  getCategory(): void {
    this.categoryService.getCategory(this.id)
      .subscribe(category => { this.category = category });
  }

}
