import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly BASE_URL;

  constructor(private http: HttpClient) {
    this.BASE_URL = 'http://localhost:8080/api';
  }

  get(url: string) {
    return this.http.get(`${this.BASE_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.BASE_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.BASE_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.BASE_URL}/${url}`);
  }
}
