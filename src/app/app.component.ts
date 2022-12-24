import { Component } from '@angular/core';
import { LoggedInUserDto } from './services/user.service';
import { Subscription } from 'rxjs';
import { UserLoginService } from './services/user-login.service';
import { Alert, AlertService } from './services/alert.service';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HanaApp';
  faArrowCircleRight = faArrowCircleRight;

  private activeModule: TypeActiveModule = 'login';

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
        this.activeModule = 'landingPage';
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

  getActiveModule(): TypeActiveModule {
    return this.activeModule;
  }

  setActiveModule(module: TypeActiveModule) {
    this.activeModule = module;
  }

  logout() {
    localStorage.removeItem('loginData');
    this.setActiveModule('login');
  }
}

type TypeActiveModule = 'login' | 'register' | 'forgotPassword' | 'landingPage';
