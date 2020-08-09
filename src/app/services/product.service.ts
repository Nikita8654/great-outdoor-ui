import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string;

  constructor(private httpClient:HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/product-service/api`
  }

  getProductList():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }
  addProduct(product: object): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: any, id: string): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/products/${id}`);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
