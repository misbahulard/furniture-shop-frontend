import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  keyword: string;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.keyword = param['keyword'];
      this.searchProduct();
    });
    this.searchProduct();
  }

  searchProduct(): void {
    this.productService.searchProduct(this.keyword)
      .subscribe(products => this.products = products);
  }

}
