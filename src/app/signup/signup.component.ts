import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  onSignUp () {
    console.log(this.signupForm);
    this.signupService.signUp(this.signupForm.value).subscribe(
      (signupRes) => console.log(signupRes),
      (singupErr) => console.log(singupErr)
    );
  }
}
