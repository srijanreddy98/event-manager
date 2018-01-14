import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }
  getToken(data: any) {
    console.log(data);
    return this.http.post('http://139.59.61.1:8080/api-token-auth/', data);
  }
}
