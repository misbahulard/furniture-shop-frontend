import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/';
  private categoryUrl = this.apiUrl + 'categories';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      catchError(this.handleError<Category[]>('fetch categories', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>('fetch category', null))
    );
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
