import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Product[]=[];
  wishlistProductId:any[]=[];
  cartPrductIds:any[]=[];
  constructor(private productService:ProductService,private wishlistService:WishlistService,private cartService:CartService) { }

  ngOnInit(): void {
    if((!!sessionStorage.getItem('userId'))&&(sessionStorage.getItem('userRole')=='RETAILER_USER')){
      this.loadProductList();
      this.loadWishlist();
      this.loadCartsInfo();
    }
   
  }
  loadProductList(){
    this.productService.getProductList().subscribe(
      (data)=>{
        this.productList=data;
      }
    )
  }
  loadCartsInfo(){
   this.cartService.getAllProductIdFromCart().subscribe((res:[])=>{
     this.cartPrductIds=res;
     console.log(this.cartPrductIds)
   })
    
  }
  loadWishlist(){
      this.wishlistService.getWishlist().pipe(    
        map((result: any[]) => {
        let productIds = []

        result.forEach(item => productIds.push(item.productId))
          console.log(productIds)
        return productIds;
      })).subscribe((data:[])=>{
        
        this.wishlistProductId=data;
        console.log(this.wishlistProductId)
      })
  }

}
