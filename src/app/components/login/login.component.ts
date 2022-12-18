import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  constructor() {}

  ngOnInit(): void {}

  emailLogin() {
    // todo: validate Email
    this.loginForm.email.error = '';
    this.loginForm.password.error = '';

    if (this.loginForm.email.value === '') {
      this.loginForm.email.error = 'Plz enter email.';
    } else if (this.loginForm.password.value === '') {
      this.loginForm.password.error = 'Plz enter password.';
    } else {
      alert('Login for Email' + this.loginForm.email.value);
    }
  }
}
