import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartServiceEvent = new BehaviorSubject({});
  baseUrl:string;
  cartItems:CartItem[]=[];
  public cartTotalPrice=0;
  public cartQty=0;
 
   constructor(private http:HttpClient,private productService:ProductService,private router:Router) { 
     this.baseUrl=`${environment.baseMWUrl}/cart-service/api`;
     if((!!sessionStorage.getItem('userId'))&&(sessionStorage.getItem('userRole')=='RETAILER_USER')){
      this.getCartDetailsByUser();
     }
     
   }
   
   private userName:string="admin"
 
   getCartDetailsByUser(){
      this.http.get<CartItem[]>(`${this.baseUrl}/carts/${sessionStorage.getItem('userId')}`).subscribe(
        (data)=>{
          this.cartItems=data;
          this.cartQty=data.length;
          this.cartTotalPrice=this.calculateTotalPrice();
          this.cartServiceEvent.next({"status":"completed"})//emitter
        }   
       ,error=>{
        console.log(error.error);
         //alert("Error while fetching the cart Details");
       }
      );
    
   }
   getAllProductIdFromCart(){

    return this.http.get(`${this.baseUrl}/carts/${sessionStorage.getItem('userId')}`).pipe(
      map((result: CartItem[]) => {
        let productIds = []

        result.forEach(item => productIds.push(item.productId))

        return productIds;
      })
    )

   }
   getCartDetails(){
 
     return this.cartItems;
   }
   calculateTotalPrice(){
     let obj = this.cartItems;
     let totalPrice  = 0;
    
     for(var o in obj ){      
       totalPrice = totalPrice +obj[o].cartItemPrice;
     }
 
     return totalPrice;
   }
 
   getQty(){
     console.log(this.cartQty);
     return this.cartQty;
   }
 
   addToCart(productItem:Product):Observable<CartItem>{
 
     let cartItem=new CartItem(0,sessionStorage.getItem('userId'),productItem.productId,productItem.productPrice,1);
     console.log("cartItem");
     return this.http.post<CartItem>(`${this.baseUrl}/carts/addToCart`,cartItem);
     /*this.http.post<CartItem>(`${this.baseUrl}/carts/addToCart`,cartItem).subscribe(
       (data)=>{
 
         this.getCartDetailsByUser();
         alert("Item added to cart Successfully...")
         this.router.navigate(['cart']);
       },
       error=>{
         //if the products is already in cart
           alert("Error in AddCart API "+error.message);
       }
     );*/
   }
   removeCartItemByUserNameAndProductId(cartItem:CartItem){
     this.http.delete(`${this.baseUrl}/carts/removeProductFromCart/${cartItem.userId}/${cartItem.cartId}`).subscribe(
       (data:any)=>{
         this.getCartDetailsByUser();
       },error=>{
        console.log(error.error);
         //alert("Error while fetching the cart Details");
       });
   }
   removeAllCartByUserName(userId:String){
     this.http.delete(`${this.baseUrl}/carts/removeProductFromCart/${userId}`);
   }
 
   updateCartQuantity(cartItem:CartItem){
     this.http.put<CartItem>(`${this.baseUrl}/carts/updateCartItem`,cartItem).subscribe(
       (data)=>{
         this.getCartDetailsByUser();
       },
       (error)=>{
        console.log(error.error);
         //alert("Error while fetching the cart Details");
       }
     );
   }
 
}
