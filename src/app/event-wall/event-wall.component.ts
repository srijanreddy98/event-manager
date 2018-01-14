import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import * as moment from 'moment';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-event-wall',
  templateUrl: './event-wall.component.html',
  styleUrls: ['./event-wall.component.css']
})
export class EventWallComponent implements OnInit {
  isManager = false;
  isAdmin = false;
  loading = false;
  showing = {
    allEvents: true,
    registered: false,
  };
  value: Date;
  display = false;
  user = {
    id : '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    isManager: false,
    isAdmin: false
  };
  constructor(private _cookieService: CookieService, private router: Router, private eventService: EventService) { }

  ngOnInit() {
    this.loading = true;
    const headers = new Headers({ Authorization: this._cookieService.get('token') });
    this.getUserStatus(headers);
    this.eventService.getUserData(headers).subscribe(
      (getUserRes) => this.user = JSON.parse(getUserRes['_body']),
      (err) => console.log(err)
    );
  }
  getEvents (headers) {
    this.eventService.getEvents(headers).subscribe(
      (getEventsRes) => {
        console.log(getEventsRes);
      },
      (getEventsErr) => console.log(getEventsErr)
    );
  }
  getUserStatus(headers) {
    this.eventService.getUserStatus(headers).subscribe(
      (res) => {
        const body = JSON.parse(res['_body']);
        this.user.isAdmin = body.is_admin; this.user.isManager = body.is_manager;
        console.log(this.user);
        this.isManager = body.is_manager;
        this.isAdmin = body.is_admin;
        this.loading = false;
      },
      (err) => console.log(err)
    );
  }
}
