import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: '',
    password: '',
  };

  constructor() {}

  ngOnInit(): void {}

  emailLogin() {
    alert('Login for Email' + this.loginForm.email);
  }
}
