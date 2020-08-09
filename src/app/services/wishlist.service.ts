import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WishlistModel } from '../models/wishlist-model';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/wishlist-service/api`
  }

  getWishlist(): Observable<WishlistModel[]> {
    return this.http.get<WishlistModel[]>(`${this.baseUrl}/wishlist/${sessionStorage.getItem('userId')}`);
  }

  removeFromWishlist(productId: String,userId:string):any {
    return this.http.delete(`${this.baseUrl}/wishlist/deleteWishlist/${productId}/${userId}`);
  }
  addtowishlist(product: Product): Observable<WishlistModel> {
    let request=new WishlistModel(product.productId,sessionStorage.getItem('userId'));
    return this.http.post<WishlistModel>(`${this.baseUrl}/wishlist/addToWishlist`, request); 
  }
}
