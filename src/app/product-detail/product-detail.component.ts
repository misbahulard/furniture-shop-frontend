import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { ProductService } from '../product.service'

import { Product } from '../product'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  goBack(): void {
    this.location.back();
  }

  getProduct(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id)
      .subscribe(product => { this.product = product });
  }

}
