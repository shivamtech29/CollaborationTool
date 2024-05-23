import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  getAnswer(question: string): Observable<string> {
    // Replace with the actual API endpoint and parameters
    return this.http.post<string>('api/ai', { question });
  }
}