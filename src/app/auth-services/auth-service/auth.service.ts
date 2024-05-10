import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
import { tap } from 'rxjs/operators';

const BASIC_URL = 'http://localhost:5000/';
export const AUTH_HEADER = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private storage: StorageService) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'signup', signupRequest)
  }
  // ...

  login(email: string, password: string): Observable<any> {
    return this.http.post<[]>(BASIC_URL + 'auth', { email, password }, { observe: 'response' })
      .pipe(
        tap(__ => this.log("user Authentication")),
        map((res: HttpResponse<any>) => {
          this.storage.saveUser(res.body);
          const tokenLenght = res.headers.get(AUTH_HEADER)!.length;
          const bearerToken = res.headers.get(AUTH_HEADER)!.substring(7, tokenLenght);
          this.storage.saveToken(bearerToken);
          return res;
        })
      );
  }
  log(message: string) {
    console.log("User Auth Service : " + message);
  }
}
