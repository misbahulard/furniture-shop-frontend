import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CategoryService} from '../category.service';
import { Category } from '../category';
import {ProductService} from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: Category[] = [];
  addForm : FormGroup;
  submitted = false;
  product: Product;
  error: String;
  picToUpload: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.addForm = this.formBuilder.group({
      idProduct: ['0'],
      idCategoryProduct: [''],
      nameProduct: [''],
      productDescription: [''],
      productPrice: [''],
      productPict: ['']
    })
  }

  getCategories(): void{
    this.categoryService.getCategories()
      .subscribe(categories =>{this.categories = categories; });
  }

  get f () {
    return this.addForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    var idProduct = this.f.idProduct.value;
    var idCategory = this.f.idCategoryProduct.value;
    var name = this.f.nameProduct.value;
    var description = this.f.productDescription.value;
    var price = this.f.productPrice.value;

    var obj = {
      idProduct,
      idCategory,
      name,
      description,
      price,
    } as Product;

    this.addProduct(obj, this.picToUpload);
  }

  addProduct(product: Product, picToUpload: File): void{
    this.productService.addProduct(product, picToUpload).subscribe(
      ()=>{
        this.error = 'Success Added Data';
      }, error => {
        this.error = error.error.message;
      });
  }

  handlePicInput(files: FileList) {
    this.picToUpload = files.item(0);
  }

}
