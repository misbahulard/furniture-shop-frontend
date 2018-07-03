import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/';
  private userUrl = this.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  authUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.userUrl}/auth`, { username: username, password: password }, httpOptions)
      .pipe(map((res: any) => {
        console.log("in service: " + res)
        if (res && res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: res.token }));
        }
      }));
  }
}
