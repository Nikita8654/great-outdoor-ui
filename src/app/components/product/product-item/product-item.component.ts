import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem:Product;
  @Input() addedToWishlist: boolean;
  @Input() addedToCart: boolean;
  constructor(private cartService:CartService,private wishlistService:WishlistService,private router:Router) { }

  ngOnInit(): void {
  }
  
  handleAddToCart(){
    this.cartService.addToCart(this.productItem).subscribe(
      (data)=>{

        this.addedToCart=true;
        this.cartService.getCartDetailsByUser();
        alert("Item added to cart Successfully...")
        
       // this.router.navigate(['cart']);
      },
      error=>{
        //if the products is already in cart
          alert("Error in AddCart API "+error.message);
      }
    );
  }

  handleAddToWishlist() {
    this.wishlistService.addtowishlist(this.productItem).subscribe(() => {
      alert("item added to wishlist..")
      this.addedToWishlist = true;
    })
  }

  handleRemoveFromWishlist() {
    this.wishlistService.removeFromWishlist(this.productItem.productId,sessionStorage.getItem('userId')).subscribe(() => {
      alert("item removed from wishlist..")
      this.addedToWishlist = false;
    })
  }

  GoToCart(){
    this.router.navigate(['cart']);
  }

}
