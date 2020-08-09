import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RetailerInventoryProduct } from '../models/retailer-inventory-product';


@Injectable({
  providedIn: 'root'
})
export class RetailerInventoryProductService {

  baseUrl:string;
  constructor(private http:HttpClient) {
     this.baseUrl=`${environment.baseMWUrl}/inventory-service/api`
   }

  getProductList():Observable<RetailerInventoryProduct[]>{
    return this.http.get<RetailerInventoryProduct[]>(`${this.baseUrl}/inventory/getAll/${sessionStorage.getItem('userId')}`);  
  }
  addProduct(product:RetailerInventoryProduct):Observable<RetailerInventoryProduct>{
    return this.http.post<RetailerInventoryProduct>(`${this.baseUrl}/inventory`,product);
  }
  findProductByInventoryId(inventoryId:string):Observable<RetailerInventoryProduct>{
    return this.http.get<RetailerInventoryProduct>(`${this.baseUrl}/inventory/${inventoryId}`);
  }
  deleteProductByInventoryId(inventoryId:string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/inventory/${inventoryId}`); 
  }
  updateInventoryProduct(product:RetailerInventoryProduct):Observable<RetailerInventoryProduct>{
    return this.http.put<RetailerInventoryProduct>(`${this.baseUrl}/inventory`,product);
  }
}
