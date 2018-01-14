import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EventService {

  constructor(private http: Http) { }
  getEvents(headers: any) {
    return this.http.get('http://139.59.61.1:8080/api/eventdata/eventsdata/', {headers: headers} );
  }
  getUserData(headers: any) {
    return this.http.get('http://139.59.61.1:8080/api/userauth/adduser/', {headers: headers});
  }
  getRegEvents(headers: any) {
    return this.http.get('http://139.59.61.1:8080/api/eventdata/eventsreg/', {headers: headers});
  }
  getAllEvents(headers: any) {
    return this.http.get('http://139.59.61.1:8080/api/eventdata/allevents/', {headers: headers});
  }
  registerForEvent(data, headers) {
    return this.http.post('http://139.59.61.1:8080/api/eventdata/eventsreg/', data, {headers: headers});
  }
  getUserStatus(headers) {
    return this.http.get('http://139.59.61.1:8080/api/userauth/checkpermission/', { headers: headers });
  }
  getManagerEvents(headers) {
    return this.http.get('http://139.59.61.1:8080/api/eventdata/eventsdata/', { headers: headers });
  }
  postNewEvent(data, headers) {
    return this.http.post('http://139.59.61.1:8080/api/eventdata/eventsdata/', data, { headers: headers });
  }
  deleteEvent(headers) {
    return this.http.delete('http://139.59.61.1:8080/api/eventdata/eventsdata/', { headers: headers });
  }
  getEventData (data, headers) {
    return this.http.post('http://139.59.61.1:8080/api/eventdata/eventdetail/', data, {headers: headers});
  }
  getAllUsers(headers) {
    return this.http.get('http://139.59.61.1:8080/api/userauth/allusers/', {headers: headers});
  }
  changePermission(data, headers) {
    return this.http.post('http://139.59.61.1:8080/api/userauth/changepermission/', data, {headers});
  }
}
