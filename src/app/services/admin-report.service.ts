import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RevenueReport } from '../models/revenue-report';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {

  baseUrl:string;
  constructor(private http:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/admin-report-service/api`
   }
 
   getRevenueReport():Observable<RevenueReport[]>{
     return this.http.get<RevenueReport[]>(`${this.baseUrl}/revenue`);
   }
}
