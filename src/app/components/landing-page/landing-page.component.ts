import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getLoggedUserEmail(): string {
    let str = localStorage.getItem('loginData') || '';
    let loginData = JSON.parse(str);

    return loginData.email;
  }
}
