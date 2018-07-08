import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CollectionComponent } from './collection/collection.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchProductComponent } from './search-product/search-product.component';
import {ProductAddComponent} from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'search/:keyword', component: SearchProductComponent },
  { path: 'add-product', component: ProductAddComponent},
  { path: 'edit-product/:id', component: ProductEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
