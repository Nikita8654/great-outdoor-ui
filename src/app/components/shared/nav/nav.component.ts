import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  totalNoOfCartItems:number;
  isLogin:boolean;
  isAdmin:boolean;
  isRetailer:boolean;
  isProductMaster:boolean;
  constructor(private cartService:CartService,private router:Router,private loginService:LoginService) {
    this.loginService.loginServiceEvent.subscribe((data)=>{
      this.toCheckUserRole();
    })
   }

  ngOnInit(): void {
    
    if((!!sessionStorage.getItem('userId'))&&(sessionStorage.getItem('RETAILER_USER'))){
      this.cartService.cartServiceEvent.subscribe(data => {
        this.totalNoOfCartItems = this.cartService.getCartDetails().length;
      
       
      });

  
    }
    
    this.toCheckUserRole();

  
  }
  toCheckUserRole(){
    if(sessionStorage.getItem('userId')!=null){
      console.log("check user")
        this.isLogin=true;
        if(sessionStorage.getItem('userRole')=='ADMIN'){
          this.isAdmin=true;
          this.isProductMaster=false;
          this.isRetailer=false;
        }
        if(sessionStorage.getItem('userRole')=='RETAILER_USER'){
          this.isAdmin=false;
          this.isProductMaster=false;
          this.isRetailer=true;
        }
        if(sessionStorage.getItem('userRole')=='PRODUCT_MASTER'){
          this.isAdmin=false;
          this.isProductMaster=true;
          this.isRetailer=false;
        }
        
    }
    else{
      this.isLogin=false;
    }
  }
  logoutUser(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    this.isLogin=false;
    this.isAdmin=false;
    this.isRetailer=false;
    this.isProductMaster=false;
    alert("Logout sucess..!");
    this.router.navigateByUrl("/");

  }

}
