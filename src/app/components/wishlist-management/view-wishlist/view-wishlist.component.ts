import { Component, OnInit } from '@angular/core';
import { WishlistModel } from 'src/app/models/wishlist-model';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css']
})
export class ViewWishlistComponent implements OnInit {

  wishList: WishlistModel[]=[];
  dataFound:boolean;
  model:WishlistModel;
  dataNotFound:boolean;
  submitted:boolean;
  constructor(private wishlistService:WishlistService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }
  loadWishlist(){
    this.wishlistService.getWishlist().subscribe((data:WishlistModel[])=>{
      this.wishList=data;
    },(error)=>{
      console.log(error);
    })
  }

  delete(productId:string) {
    this.wishlistService.removeFromWishlist(productId,sessionStorage.getItem('userId')).subscribe(() => {
      alert("item removed from wishlist..")
      this.loadWishlist();
    })
  }
}
