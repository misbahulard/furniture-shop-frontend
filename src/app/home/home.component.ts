import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.productService.getproducts()
      .subscribe(products => { this.products = products });
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => { this.categories = categories });
  }

}
