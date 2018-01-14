import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService, private _cookieService: CookieService, private router: Router) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    this.loginService.getToken({username: 'srijanreddy98', password: 'qazwsxedc'}).subscribe(
      (getTokenRes) => {
        const token = JSON.parse(getTokenRes['_body']).token;
        this._cookieService.put('token', 'Jwt ' + token);
        this.router.navigate(['/event-wall']);
      },
      (err) => console.log(err)
    );
  }

}
