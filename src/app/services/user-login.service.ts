import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { LoggedInUserDto, UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private loggedInUserData: LoggedInUserDto | null = null;
  private subject = new Subject<LoggedInUserDto>();

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  setLoggedInUserData(dto: LoggedInUserDto): void {
    this.loggedInUserData = dto;
    this.subject.next(this.loggedInUserData);
  }

  publishLoggedInUserData(): Observable<LoggedInUserDto> {
    return this.subject.asObservable();
  }

  validateLoginDataInLocalstorage() {
    let loginData = localStorage.getItem('loginData');
    if (loginData !== null) {
      let loginDataObj = JSON.parse(loginData);

      if (loginDataObj !== null) {
        this.userService.validateToken(loginDataObj).subscribe((res) => {
          // token: 'valid' | 'invalid' | 'expired'

          if (res.error === true) {
          } else {
            if (res.token == 'valid') {
              this.setLoggedInUserData(loginDataObj);
            } else {
              localStorage.removeItem('loginData');
            }

            if (res.token == 'invalid') {
              this.alertService.addAlert({
                status: 'danger',
                message: 'Invalid Login!',
              });
            } else if (res.token == 'expired') {
              this.alertService.addAlert({
                status: 'info',
                message: 'Login expired.',
              });
            }
          }
        });
      }
    }
  }
}
