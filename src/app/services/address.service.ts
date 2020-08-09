import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string;

  private apiurl = "assets/address.json";
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseMWUrl}/address-service/api`;

  }
  getAddressList(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/address/all/${sessionStorage.getItem('userId')}`);
  }

  getById(addId: string): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/address/${addId}`);
  }

  addAddress(addressModel: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/address/add`, addressModel);
  }
  deleteAddress(addId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/address/delete/${addId}`);
  }
  updateAddress(address: Address): Observable<Address> {
    console.log(address);
    return this.http.put<Address>(`${this.baseUrl}/address/update`, address);
  }
}
