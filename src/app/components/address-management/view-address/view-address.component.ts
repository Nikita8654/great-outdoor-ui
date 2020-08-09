import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {

  addressList: Address[]=[];
  isDeleted: boolean;


  constructor(private router: Router, private service: AddressService) { }

  ngOnInit(): void {
    if((!!sessionStorage.getItem('userId')) && (sessionStorage.getItem('userRole')=='RETAILER_USER')){
      this.loadAddressList();
    }
    
  }
  loadAddressList() {
    this.service.getAddressList().subscribe(
      (data:Address[]) => { this.addressList = data; },
      (error)=>{
        console.log(error.error);
        //alert("Error while during fetching address..!!")
      }
    );
  }
  deleteAddress(addid: string) {

    if(confirm("Are u sure want to delete?")){
      this.service.deleteAddress(addid).subscribe(
        (data) => {
          this.isDeleted=true;
          setTimeout(()=>this.isDeleted=false,3000)
          this.loadAddressList();
        },
        (err) => {
         console.log(err.message)
        }
      )
    }

  }
  setId = (addid: string) => {
   // this.service.addid = addid;
    this.router.navigate(['address/edit-address',addid])

  }

}
