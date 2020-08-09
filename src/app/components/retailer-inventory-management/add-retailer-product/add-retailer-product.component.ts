import { Component, OnInit } from '@angular/core';
import { RetailerInventoryProduct } from 'src/app/models/retailer-inventory-product';
import { RetailerInventoryProductService } from 'src/app/services/retailer-inventory-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-retailer-product',
  templateUrl: './add-retailer-product.component.html',
  styleUrls: ['./add-retailer-product.component.css']
})
export class AddRetailerProductComponent implements OnInit {

  success: boolean;
  categoryList = ["Camping Equipment", "Golf Equipment", "Mountaineering Equipment", "Outdoor Protection", "Personal Accessories"];
  model: RetailerInventoryProduct;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  constructor(private service: RetailerInventoryProductService, private router: Router) {
    this.model = new RetailerInventoryProduct();
  }

  ngOnInit(): void {
  }

  addProduct() {
    let productRecieveDate = new Date(this.model.productReceiveDate);
    let time = this.model.productReceiveTime.split(":")
    productRecieveDate.setHours(Number.parseInt(time[0]))
    productRecieveDate.setMinutes(Number.parseInt(time[1]))
    console.log(productRecieveDate)
    this.model.productReceiveTimeStamp = productRecieveDate.getTime();

    let productSaleDate = new Date(this.model.productSaleDate);
    let sTime = this.model.productSaleTime.split(":")
    productSaleDate.setHours(Number.parseInt(sTime[0]))
    productSaleDate.setMinutes(Number.parseInt(sTime[1]))
    console.log(productSaleDate)
    this.model.productSaleTimeStamp = productSaleDate.getTime();

    this.model.retailerId = sessionStorage.getItem('userId');

    if (new Date(this.model.productSaleTimeStamp) < new Date(this.model.productReceiveTimeStamp)) {
      alert('End Date cant be before start date');
    }

    else {
      let orb = this.service.addProduct(this.model);
      orb.subscribe((data) => {
        this.success = true;
        setTimeout(() => this.success = false, 3000);
        alert('PRODUCT ADDED SUCCESSFULLY :-)');
        this.router.navigate(['viewall-retailer-product']);
      }, (error) => { alert("Error:" + error.error) })
    }
  }


}
