import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  postAnswer(answerDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'answer', answerDto,
      { headers: this.createAuthorizationHeadere() })
  }
  // headersImage = new HttpHeaders({
  //   'Authorization': 'Bearer ' + StorageService.getToken(),
  //   'Content-Type': 'multipart/form-data' // Set the correct Content-Type
  // });
  postAnswerImage(file: FormData, answerId: number): Observable<any> {
    return this.http.post<[]>(BASIC_URL + `image/${answerId}`, file,
      { headers: this.createAuthorizationHeadere() })
  };

  createAuthorizationHeadere() {
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
