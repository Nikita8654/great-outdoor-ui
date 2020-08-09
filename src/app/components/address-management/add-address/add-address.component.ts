import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';
import { Location } from '@angular/common';

interface AddressType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  success:boolean;
  addressModel:Address ;
  addressForm:FormGroup;
  addressTypes: AddressType[] = [
    {value: 'HOME', viewValue: 'HOME'},
    {value: 'OFFICE', viewValue: 'OFFICE'},
    {value: 'OTHER', viewValue: 'OTHER'}
  ];

  constructor(private router:Router, private location:Location, private service:AddressService) { 
  this.addressModel=new Address();}
  ngOnInit() {
    
    this.addressForm= new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      addressLine: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      pincode: new FormControl('', [Validators.required, Validators.min(100000),Validators.max(999999)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      phoneNo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      otherPhoneNo: new FormControl(''),
      addressType: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addressForm.controls[controlName].hasError(errorName);
  }
 
   public onCancel = () => {
     this.location.back();
  }
 
  public addAddress = (addressFormValue: {fullName:string, addressLine: string; city: string; pincode: number; state: string; phoneNo:string;otherPhoneNo:string; addressType:string}) => {
    if (this.addressForm.valid) {
      this.executeAddressCreation(addressFormValue);
    }
  }
 
  private executeAddressCreation = (addressFormValue: {fullName:string, addressLine: string; city: string; pincode: number; state: string; phoneNo:string;otherPhoneNo:string; addressType:string }) => {
    let address:Address = {
      addressId: null,
      userId:sessionStorage.getItem('userId'),
      fullName:addressFormValue.fullName,
      addressLine: addressFormValue.addressLine,
      city: addressFormValue.city,
      pincode: addressFormValue.pincode,
      state: addressFormValue.state,
      phoneNo:addressFormValue.phoneNo,
      otherPhoneNo:addressFormValue.otherPhoneNo,
      addressType:addressFormValue.addressType
    }   
    this.service.addAddress(address).subscribe(
      (data)=>{
      this.success=true;
      setTimeout(()=>this.success=false,3000);
      console.log("Address added successfully...!!")
      this.router.navigate(['/address/view-address'])
    })
}

}
