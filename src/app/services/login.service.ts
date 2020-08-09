import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable,  Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string;
  currentUser:User;
  loginServiceEvent = new Subject<string>();
  constructor(private http:HttpClient) {

    this.baseUrl=`${environment.baseMWUrl}/user-service/api/user`;
   }

   userLogin(uid:string,password:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/login/${uid}/${password}`);
   
   }
   loggedIn():boolean{
     return !!sessionStorage.getItem('userId');
   }
}
