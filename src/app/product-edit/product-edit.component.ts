import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import { Product } from '../product';
import { Category } from '../category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categories: Category[] = [];
  editForm: FormGroup;
  submitted = false;
  id: number;
  product: Product;
  error: String;
  picToUpload: File = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getCategories();

    this.editForm = this.formBuilder.group({
      idProduct: [''],
      idCategoryProduct: [''],
      nameProduct: [''],
      productDescription: [''],
      productPrice: [''],
      productPict: ['']
    
    })
  }

  getProduct(): void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id)
      .subscribe(product => { 
        this.product = product; 
        this.editForm.setValue({
          idProduct: this.product.idProduct,
          idCategoryProduct: this.product.idCategory,
          nameProduct: this.product.name,
          productDescription: this.product.description,
          productPrice: this.product.price,
          productPict: this.product.pic
        })
      });
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => { this.categories = categories; });
  }

  get f () {
    return this.editForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    var idProduct = this.f.idProduct.value;
    var idCategory = this.f.idCategoryProduct.value;
    var name = this.f.nameProduct.value;
    var description = this.f.productDescription.value;
    var price = this.f.productPrice.value;
    var pic = this.f.productPict.value;

    var obj = {
      idProduct,
      idCategory,
      name,
      description,
      price
    } as Product;
    this.updateProduct(obj, this.picToUpload);

  }

  updateProduct(product: Product, picToUpload: File): void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(this.id, product, picToUpload)
      .subscribe(
        () => {
          var url = `/product/${this.id}`;
          this.router.navigate([url]);
        }
      )
  }

  handlePicInput(files: FileList) {
    this.picToUpload = files.item(0);
  }

}
