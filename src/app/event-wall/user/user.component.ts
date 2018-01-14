import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../event.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allEvents = true;
  public items: MenuItem[];
  user = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    isManager: false,
    isAdmin: false
  };
  Events = [];
  registeredEvents = [];
  filteredEvents = [];
  filteredRegEvents = [];
  constructor(private _cookieService: CookieService, private router: Router, private eventService: EventService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.items = [
      { label: 'All Events', icon: 'fa-calendar', command: () => this.changeVar(0) },
      { label: 'Registered Events', icon: 'fa-book', command: () => this.changeVar(1) },
      { label: 'Support', icon: 'fa-support', command: () => this.changeVar(0) },
      { label: 'Social', icon: 'fa-twitter', command: () => this.changeVar(0) }
    ];
    const headers = new Headers({ Authorization: this._cookieService.get('token') });
    this.eventService.getUserData(headers).subscribe(
      (getUserRes) => this.user = JSON.parse(getUserRes['_body']),
      (err) => console.log(err)
    );
    this.getAllEvents(headers);
    this.getRegEvents(headers);
    this.getUserStatus(headers);
  }
  getAllEvents(headers) {
    this.eventService.getAllEvents(headers).subscribe(
        (getRegRes) => {
          // console.log(getRegRes);
          const body = JSON.parse(getRegRes['_body']);
          for (const i of body) {
            const event = {
              start_time: '',
              end_time: '',
              start_date: '',
              end_date: '',
              description: '',
              name: '',
              id: ''
            };
            // console.log(i);
            event.start_date = i.start_date; event.start_time = i.start_time;
            event.end_date = i.end_date; event.end_time = i.end_time;
            event.name = i.name; event.description = i.description;
            event.id = i.id;
            // console.log(event);
            this.Events.push(event);
          }
          this.filteredEvents = this.Events;
      },
      (getEventsErr) => console.log(getEventsErr)
    );
  }
  getRegEvents(headers) {
    this.eventService.getRegEvents(headers).subscribe(
      (getRegRes) => {
          // console.log(getRegRes);
          const body = JSON.parse(getRegRes['_body']);
          for (const i of body) {
            const event = {
              start_time: '',
              end_time: '',
              start_date: '',
              end_date: '',
              description: '',
              name: '',
              id: ''
            };
            event.start_date = i.start_date; event.start_time = i.start_time;
            event.end_date = i.end_date; event.end_time = i.end_time;
            event.name = i.name; event.description = i.description;
            event.id = i.id;
            this.registeredEvents.push(event);
          }
          this.filteredRegEvents = this.registeredEvents;
        },
          (getEventsErr) => console.log(getEventsErr)
    );
  }
  getUserStatus(headers) {
    this.eventService.getUserStatus(headers).subscribe(
      (res) => {const body = JSON.parse(res['_body']);
      this.user.isAdmin = body.isAdmin; this.user.isManager = body.isManager;
    },
      (err) => console.log(err)
    );
  }
  getDate(date, format) {
    return moment(date).format(format);
  }
  applyFilter(filterValue: any) {
    if (!filterValue) {
      this.filteredEvents = this.allEvents ? this.Events : this.registeredEvents;
    }
    if (this.allEvents) {
    this.filteredEvents = this.Events.filter(userData => userData.name.indexOf(filterValue) >= 0);
    } else {
     this.filteredEvents = this.registeredEvents.filter(userData => userData.name.indexOf(filterValue) >= 0);
    }
  }
  register(i) {
    const headers = new Headers({ Authorization: this._cookieService.get('token') });
    const registerFor = {
      event_id: this.filteredEvents[i].id,
      applied_by: this.user.id,
      fullname: this.user.first_name + ' ' + this.user.last_name,
      number: this.user.username
    };
    this.eventService.registerForEvent(registerFor, headers).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  changeVar(key) {
    this.allEvents = key === 0 ? true : false;
    this.applyFilter('');
  }
}
// @Component({
//   templateUrl: './register.component.html',
// })
// export class RegisterComponent implements OnInit {
//   signupForm: FormGroup;
//   constructor(public dialogRef: MatDialogRef<RegisterComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {}
//   ngOnInit() {
//     this.signupForm = new FormGroup({
//       'username': new FormControl(null, Validators.required),
//       'password': new FormControl(null, Validators.required),
//       'first_name': new FormControl(null, Validators.required),
//       'last_name': new FormControl(null, Validators.required),
//       'email': new FormControl(null, [Validators.required, Validators.email])
//     });
//   }
//   }
