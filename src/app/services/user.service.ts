import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string;
  constructor(private httpClient: HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/user-service/api`;
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/user/registration`, user);
  }
}
