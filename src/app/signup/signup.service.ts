import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SignupService {

  constructor(private http: Http) { }

  signUp(data) {
    return this.http.post('http://139.59.61.1:8080/api/userauth/adduser/', data);
  }

}
