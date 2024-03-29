import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import { emailLoginUserDto, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  @Output() showForgotPassword = new EventEmitter();

  loginForm = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  constructor(
    private userService: UserService,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {}

  loginEmailChange() {
    this.loginForm.email.error = '';
  }

  loginPasswordChange() {
    this.loginForm.password.error = '';
  }

  emailLogin() {
    // todo: validate Email
    this.loginForm.email.error = '';
    this.loginForm.password.error = '';

    if (this.loginForm.email.value === '') {
      this.loginForm.email.error = 'Plz enter email.';
    } else if (this.loginForm.password.value === '') {
      this.loginForm.password.error = 'Plz enter password.';
    } else {
      let dto: emailLoginUserDto = {
        email: this.loginForm.email.value,
        password: this.loginForm.password.value,
      };

      this.userService.emailLogin(dto).subscribe((a) => {
        console.log('a', a);
        if (a.error === true) {
          if (a.email) {
            this.loginForm.email.error = a.email;
          }

          if (a.password) {
            this.loginForm.password.error = a.password;
          }
        } else {
          this.userLoginService.setLoggedInUserData(a);
        }
      });
    }
  }

  onShowRegister() {
    this.showRegister.emit();
  }

  onShowForgotPassword() {
    this.showForgotPassword.emit();
  }
}
