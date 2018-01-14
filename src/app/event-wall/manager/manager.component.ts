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
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  selectedTab = 0;
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
  userEvents = [];
  constructor(private _cookieService: CookieService, private router: Router, private eventService: EventService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.items = [
      { label: 'All Events', icon: 'fa-calendar', command: () => this.changeVar(0) },
      { label: 'Registered Events', icon: 'fa-book', command: () => this.changeVar(1) },
      { label: 'Your Events', icon: 'fa-book', command: () => this.changeVar(2) },
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
    this.getManagerEvents(headers);
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
        const bod = JSON.parse(getRegRes['_body']);
        for (const i of bod) {
          this.eventService.getEventData({event_id: i.event_id}, headers).subscribe(
            (eventRes) => {
              const body = JSON.parse(eventRes['_body'])[0];
              const event = {
                start_time: '',
                end_time: '',
                start_date: '',
                end_date: '',
                description: '',
                name: '',
                id: ''
              };
              event.start_date = body.start_date; event.start_time = body.start_time;
              event.end_date = body.end_date; event.end_time = body.end_time;
              event.name = body.name; event.description = body.description;
              event.id = body.event_id;
              this.registeredEvents.push(event);
            },
            (eventErr) => console.log(eventErr)
          );
        }
        this.filteredRegEvents = this.registeredEvents;
      },
      (getEventsErr) => console.log(getEventsErr)
    );
  }
  getManagerEvents(headers) {
    this.eventService.getManagerEvents(headers).subscribe(
      (res) => { const body = JSON.parse(res['_body']);
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
          this.userEvents.push(event);
        }
    },
      (err) => console.log(err)
    );
  }
  getUserStatus(headers) {
    this.eventService.getUserStatus(headers).subscribe(
      (res) => {
        const body = JSON.parse(res['_body']);
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
      switch (this.selectedTab) {
        case 0:
          this.filteredEvents = this.Events;
          break;
        case 1:
          this.filteredEvents = this.registeredEvents;
          break;
        case 2:
          this.filteredEvents = this.userEvents;
      }
    }
    if (this.selectedTab === 0 ) {
      this.filteredEvents = this.Events.filter(userData => userData.name.indexOf(filterValue) >= 0);
    } else if (this.selectedTab === 1) {
      this.filteredEvents = this.registeredEvents.filter(userData => userData.name.indexOf(filterValue) >= 0);
    } else {
      this.filteredEvents = this.userEvents.filter(userData => userData.name.indexOf(filterValue) >= 0);
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
    this.selectedTab = key;
    this.applyFilter('');
  }
  deleteEvent(i) {
    console.log(i);
    const headers = new Headers({ Authorization: this._cookieService.get('token'), body: { id: this.filteredEvents[i].id}});
    this.eventService.deleteEvent( headers).subscribe(
      (res) => {this.Events.splice(i, 1); this.applyFilter(''); } ,
      (err) => console.log(err)
    );
  }
  newEvent() {
    this.dialog.closeAll();
    const newEvent = this.dialog.open(RegisterEventComponent, {
      width: '400px',
      data: { }
    });
    newEvent.afterClosed().subscribe(result => {
      if (result) {
        const headers = new Headers({ Authorization: this._cookieService.get('token') });
        result['user_id'] = this.user.id;
        result.start_date = this.getDate(result.start_date, 'YYYY-MM-DD');
        result.end_date = this.getDate(result.end_date, 'YYYY-MM-DD');
        result.start_time = this.getDate( result.start_time, 'HH:mm:ss');
        result.end_time = this.getDate( result.end_time, 'HH:mm:ss');
        this.eventService.postNewEvent(result, headers).subscribe(
          (res) => {
            const body = JSON.parse(res['_body']);
            this.userEvents.push(body);
          },
          (err) => console.log(err)
        );
      }
     });
  }
}
@Component({
  templateUrl: './registerevent.component.html',
})
export class RegisterEventComponent implements OnInit {
  eventForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<RegisterEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    this.eventForm = new FormGroup({
      'start_time': new FormControl(new Date(), Validators.required),
      'start_date': new FormControl(new Date(), Validators.required),
      'end_time': new FormControl(new Date(), Validators.required),
      'end_date': new FormControl(new Date((new Date()).getTime() + 86400000), Validators.required),
      'description': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required)
    });
  }
  submit() {
    // console.log(this.eventForm);
    this.dialogRef.close(this.eventForm.value);
  }
  }
