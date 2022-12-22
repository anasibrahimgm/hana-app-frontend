import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert: any;
  private subject = new Subject<Alert>();
  constructor() {}

  addAlert(alert: Alert) {
    this.alert = alert;

    this.subject.next(this.alert);
  }

  showAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }
}

export type Alert = {
  status: AlertStatus;
  message: string;
};

export type AlertStatus =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary';
