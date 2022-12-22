import { Component } from '@angular/core';
import { LoggedInUserDto } from './services/user.service';
import { Subscription } from 'rxjs';
import { UserLoginService } from './services/user-login.service';
import { Alert, AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HanaApp';

  private loggedIn: boolean = false;

  loginData: LoggedInUserDto = {
    email: '',
    token: '',
  };

  loginSubscription: Subscription;
  alertSubscription: Subscription;

  alerts: Alert[] = [];

  constructor(
    private userLoginService: UserLoginService,
    private alertService: AlertService
  ) {
    this.loginSubscription = this.userLoginService
      .publishLoggedInUserData()
      .subscribe((dto) => {
        this.loggedIn = true;
        this.loginData = dto;

        localStorage.setItem('loginData', JSON.stringify(this.loginData));
      });

    this.alertSubscription = this.alertService
      .showAlert()
      .subscribe((alert: Alert) => {
        this.alerts.push(alert);
      });

    this.userLoginService.validateLoginDataInLocalstorage();
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
