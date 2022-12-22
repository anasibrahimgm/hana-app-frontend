import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user/';
  constructor(private httpClient: HttpClient) {}

  emailLogin(dto: emailLoginUserDto): Observable<LoggedInUserDto> {
    let url = this.apiUrl + 'login';
    return this.httpClient
      .post<LoggedInUserDto>(url, dto, httpOptions)
      .pipe(catchError(this.handleEmailLoginError));
    // when getting the confirmatio from backend, save it in app.component.ts so that u login the user
  }

  private handleEmailLoginError(error: HttpErrorResponse) {
    if (error.status === 400) {
      error.error.error = true;
      return of(error.error);
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  validateToken(dto: LoggedInUserDto): Observable<any> {
    let url = this.apiUrl + 'validatetoken';
    return this.httpClient
      .post<any>(url, dto, httpOptions)
      .pipe(catchError(this.handleValidateTokenError));
  }

  private handleValidateTokenError(error: HttpErrorResponse) {
    if (error.status === 400) {
      error.error.error = true;
      return of(error.error);
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

export type emailLoginUserDto = {
  readonly email: string;
  readonly password: string;
};

export type LoggedInUserDto = {
  readonly email: string;
  readonly token: string;
  readonly error?: boolean;
  readonly password?: string;
};
