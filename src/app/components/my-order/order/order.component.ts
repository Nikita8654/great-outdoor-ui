import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderModel } from 'src/app/models/order-model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList:OrderModel[]=[];
  refundSuccess:boolean=false;
  productsList:Product[]=[];
  productItem:Product;
  constructor(private orderService:OrderService,private router:Router,private addressService:AddressService,private productService:ProductService) { }

  ngOnInit(): void {
    if((!!sessionStorage.getItem('userId'))&&(sessionStorage.getItem('userRole')=='RETAILER_USER')){
      //this.loadProductList()
      this.loadOrderList();
    }   
  }

  loadProductList(){
    this.productService.getProductList().subscribe((data)=>{
      this.productsList=data;
    })
  }
  loadOrderList(){
    this.orderService.getAllOrderList(sessionStorage.getItem('userId')).subscribe((data)=>{
      this.orderList=data;
      console.log(this.orderList);
    },(error)=>{
      console.log(error.message);
     // alert("Error while during fetching order list");
    }
    )
  }

  populateOrderDetails(orderedItem:OrderModel){
    console.log("populate order details");
    this.router.navigate(['orders', orderedItem.orderId]);
  }

  getProductNameById(productId:string){


     for(let item of this.productsList){
        if(item.productId==productId){
          this.productItem=item;
          break;
        }
      }
      if(this.productItem!=null){
        console.log(this.productItem.productName)
        return this.productItem.productName;
      }


    
  }

}
