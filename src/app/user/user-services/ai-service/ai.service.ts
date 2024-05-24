// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { StorageService } from '../../../auth-services/storage-service/storage.service';

// const BASIC_URL = 'http://localhost:5000/api/'

// @Injectable({
//   providedIn: 'root'
// })
// export class AiService {
//   constructor(private http: HttpClient) {}

//   getAnswer(gptDto: any): Observable<any> {
//     return this.http.post(BASIC_URL + 'getResponseFromGenAI', gptDto,
//       { headers: this.createAuthorizationHeadere() })
//   }
//   createAuthorizationHeadere() {
//     let authHeaders = new HttpHeaders();
//     return authHeaders.set(
//       'Authorization', 'Bearer ' + StorageService.getToken()
//     )
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-service/storage.service';

const BASIC_URL = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  getAnswer(query: string): Observable<any> {
    const payload = { query }; // Create payload object
    return this.http.post(BASIC_URL + 'getResponseFromGenAI', payload, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text'
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const authHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
