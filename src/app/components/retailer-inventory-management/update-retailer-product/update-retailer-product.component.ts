import { Component, OnInit } from '@angular/core';
import { RetailerInventoryProductService } from 'src/app/services/retailer-inventory-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailerInventoryProduct } from 'src/app/models/retailer-inventory-product';

@Component({
  selector: 'app-update-retailer-product',
  templateUrl: './update-retailer-product.component.html',
  styleUrls: ['./update-retailer-product.component.css']
})
export class UpdateRetailerProductComponent implements OnInit {

  model: RetailerInventoryProduct;
  inventoryId: string;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  constructor(private route: ActivatedRoute, private service: RetailerInventoryProductService, private router: Router) {
    this.model = new RetailerInventoryProduct();
  }

  ngOnInit(): void {
    if ((!!sessionStorage.getItem('userId')) && (sessionStorage.getItem('userRole') == 'RETAILER_USER')) {
      this.getInventoryIdFromUrl();
    }
  }

  getInventoryIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      this.inventoryId = params.get('inventoryId');
      this.getInventoryProductDetails(this.inventoryId)
      console.log(this.inventoryId);
    });
  }
  getInventoryProductDetails(inventoryId: string) {
    this.service.findProductByInventoryId(inventoryId).subscribe((data: RetailerInventoryProduct) => {
      this.model = data;
      let productReceiveDate = new Date(data.productReceiveTimeStamp)
      this.model.productReceiveDate = productReceiveDate;
      this.model.productSaleDate = new Date(data.productSaleTimeStamp)
      this.model.productReceiveTime = this.model.productReceiveDate.toTimeString().split(" ")[0]
      this.model.productSaleTime = this.model.productSaleDate.toTimeString().split(" ")[0]
    }, (err) => alert("error diuring fetching product from inventory: " + err))
  }
  updateInventoryProduct() {
    let productRecieveDate = new Date(this.model.productReceiveDate);
    console.log(productRecieveDate);

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

    if (new Date(this.model.productSaleTimeStamp) < new Date(this.model.productReceiveTimeStamp)) {
      alert('End Date cant be before start date');
    }
    else {
      if (this.model != null) {
        this.service.updateInventoryProduct(this.model).subscribe((data) => {
          alert("Update successfully..!!")
          this.router.navigate(['viewall-retailer-product']);
        }, (err) => {
          alert("Error:" + err.error)
        })
      }
    }

  }

}
