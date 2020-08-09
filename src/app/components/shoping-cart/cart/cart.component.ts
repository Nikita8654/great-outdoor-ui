import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { Product } from 'src/app/models/product';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  deliveryFee = 40;
  cartTotalPrice = 0;
  itemAddedToCart: boolean;
  cartItems: CartItem[] = [];
  addressId: string = "";
  pay_type = "cash_on_delivery";

  addressList:Address[]=[];

  actualProductPrice: number;
  constructor(private cartService: CartService, private productService: ProductService, 
    private orderService: OrderService, private router: Router,private addressService:AddressService) {

  }

  ngOnInit(): void {

    if((!!sessionStorage.getItem('userId'))&&(sessionStorage.getItem('userRole')=='RETAILER_USER')){
      this.loadCartItems();
      this.getAddressList();
      //below function will be triggerd from when removing and qty  is changing..
      this.cartService.cartServiceEvent.subscribe(data => {
        this.cartItems = this.cartService.getCartDetails();
        this.cartTotalPrice = this.cartService.cartTotalPrice;
      });
    }
 
  }

  loadCartItems() {
    this.cartService.getCartDetailsByUser();
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartItems = this.cartService.getCartDetails();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    })
  }


  IncreaseQuantity(cartItem: CartItem) {
    //To find actual price of product
    cartItem.quantity += 1;
    cartItem.cartItemPrice = (cartItem.actualProductPrice * cartItem.quantity);
    this.cartService.updateCartQuantity(cartItem);
  }
  decreaseQuantity(cartItem: CartItem) {

    if (cartItem.quantity > 1) {
      //To find actual price of product
      cartItem.quantity -= 1;
      cartItem.cartItemPrice = (cartItem.actualProductPrice * cartItem.quantity);
      this.cartService.updateCartQuantity(cartItem);

    }

  }
  findActualPriceOfProduct(productId: string) {

  }
  removeItemFromCart(cartItem: CartItem) {
    if (confirm("Are you sure want to delete..?")) {

      this.cartService.removeCartItemByUserNameAndProductId(cartItem);
    }
  }

  checkOutChart() {
    if (this.addressId == "") {
      alert("Plz select address..");
      return;
    }
    if (this.pay_type == "cash_on_delivery") {
      var request = {
        "userId": sessionStorage.getItem('userId'),
        "total_price": this.cartTotalPrice,
        "addressId": this.addressId,
        "paymentType": "COD"
      }
     this.orderService.checkOutCart(request).subscribe((data) => {
        alert("checkout process completed.Your Order is processed..");
        this.cartService.getCartDetailsByUser();
        this.router.navigate(['/orders']);
      }, (error) => {
        console.log(error.error);
        //alert("Error while fetching the cart Details");
      }
      )
      console.log("ok");
    }
    else {
      alert("Payment Integration is not yet completed.")
    }

  }

  getAddressList(){
    this.addressService.getAddressList().subscribe((data:Address[])=>{
           this.addressList=data;
    },(error)=>{
      console.log(error.error);
      //alert("Error while fetching address..")
    }
    )
  }

}
