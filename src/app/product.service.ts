import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { url } from 'inspector';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/';
  private productsUrl = this.apiUrl + 'products';

  constructor(
    private http: HttpClient
  ) { }

  getproducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      catchError(this.handleError<Product[]>('fetch products', []))
    );
  }

  getProductsByCategory(idCategory: number): Observable<Product[]> {
    const url = `${this.productsUrl}/category/${idCategory}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError<Product[]>('fetch product by id category', []))
    );
  }

  getProduct(idProduct: number): Observable<Product> {
    const url = `${this.productsUrl}/${idProduct}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>('fetch product', null))
    );
  }

  searchProduct(keyword: string): Observable<Product[]> {
    const url = `${this.productsUrl}/search/${keyword}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError<Product[]>('search product', []))
    );
  }

  addProduct(product: Product ): Observable<Product> {
      return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
        catchError(this.handleError<Product>('add new product', null))
      )
    }

  deleteProduct(idProduct: number): Observable<Product>{
    const url = `${this.productsUrl}/${idProduct}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      catchError(this.handleError<Product>('delete product', null))
    );
  }

  updateProduct(idProduct: number, product: Product): Observable<Product>{
    const url = `${this.productsUrl}/${idProduct}`;
    return this.http.put<Product>(url, product, httpOptions).pipe(
      catchError(this.handleError<Product>('update product', null))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
