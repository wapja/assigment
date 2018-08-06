import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}



  public findAllUsers(): Observable<any> {
    const url = 'https://randomuser.me/api/?results=500';

    return this.http.get<any>(url);
  }
}
