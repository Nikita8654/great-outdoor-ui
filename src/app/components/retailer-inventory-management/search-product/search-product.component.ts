import { Component, OnInit } from '@angular/core';
import { RetailerInventoryProductService } from 'src/app/services/retailer-inventory-product.service';
import { RetailerInventoryProduct } from 'src/app/models/retailer-inventory-product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  
  inventoryId:string;
  model:RetailerInventoryProduct;
  dataFound:boolean;
  dataNotFound:boolean;
  submitted:boolean;
  constructor(private service:RetailerInventoryProductService) { }

  ngOnInit(): void {
  }

  findById(){
    this.submitted=true;
    
      this.service.findProductByInventoryId(this.inventoryId).subscribe(
        (data)=>{
          this.dataFound=true;
          this.model=data;
          console.log(this.model);
          
        },
        (err)=>{
          this.dataNotFound=true;
          this.dataFound=false;
          setTimeout(()=>this.dataNotFound=false,3000);
        }
      )
  }

}
