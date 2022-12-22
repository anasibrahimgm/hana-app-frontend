import { Component, Input, OnInit } from '@angular/core';
import { AlertStatus } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input()
  status: AlertStatus = 'primary';

  @Input()
  message: string = '';

  constructor() {}

  ngOnInit(): void {}
}
