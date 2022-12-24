import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserLoginService } from 'src/app/services/user-login.service';
import {
  emailRegisterUserDto,
  UserService,
} from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() showLogin = new EventEmitter();

  registerForm = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };

  constructor(
    private userService: UserService,
    private userLoginService: UserLoginService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  registerNameChange() {
    this.registerForm.email.error = '';
  }

  registerEmailChange() {
    this.registerForm.email.error = '';
  }

  registerPasswordChange() {
    this.registerForm.password.error = '';
  }

  emailRegister() {
    if (this.validateDataForRegister() === false) return;

    let dto: emailRegisterUserDto = {
      name: this.registerForm.name.value,
      email: this.registerForm.email.value,
      password: this.registerForm.password.value,
    };

    this.userService.emailRegister(dto).subscribe((res) => {
      if (res.error !== true) {
        this.userLoginService.setLoggedInUserData(res);

        this.alertService.addAlert({
          status: 'success',
          message: 'You are successfully registered.',
        });
        return;
      }

      if (res.name) this.registerForm.name.error = res.name;
      if (res.email) this.registerForm.email.error = res.email;
      if (res.password) this.registerForm.password.error = res.password;
    });
  }

  private validateDataForRegister() {
    // todo: validate Email

    let valid: boolean = true;

    this.registerForm.name.error = '';
    this.registerForm.email.error = '';
    this.registerForm.password.error = '';

    if (this.registerForm.name.value === '') {
      this.registerForm.name.error = 'Plz enter name.';
      valid = false;
    }

    if (this.registerForm.email.value === '') {
      this.registerForm.email.error = 'Plz enter email.';
      valid = false;
    }

    if (this.registerForm.password.value === '') {
      this.registerForm.password.error = 'Plz enter password.';
      valid = false;
    }

    return valid;
  }

  onShowLogin() {
    this.showLogin.emit();
  }
}
