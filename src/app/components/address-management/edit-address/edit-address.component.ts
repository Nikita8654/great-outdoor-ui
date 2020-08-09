import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';

interface AddressType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  success:boolean;
  addressId: string;
  addressModel:Address;
  addressForm:FormGroup;
  valueModel:Address;
  addressTypes: AddressType[] = [
    {value: 'HOME', viewValue: 'HOME'},
    {value: 'OFFICE', viewValue: 'OFFICE'},
    {value: 'OTHER', viewValue: 'OTHER'}
  ];

  constructor(private router:Router, private location: Location, private service:AddressService,private route:ActivatedRoute) { 
    this.addressModel=new Address();
    }

  ngOnInit(): void {
    this.addressForm= new FormGroup({
      addressId:new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      addressLine: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      pincode: new FormControl('', [Validators.required, Validators.min(100000),Validators.max(999999)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      phoneNo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      otherPhoneNo: new FormControl(''),
      addressType: new FormControl('', [Validators.required])
    });
    if((!!sessionStorage.getItem('userId')) && (sessionStorage.getItem('userRole')=='RETAILER_USER')){
       this.getAddressIdFromUrl();
    }
    
  }
  getAddressIdFromUrl(){
    this.route.paramMap.subscribe(params => {
      this.addressId = params.get('addressId');
        this.populateValue();
        console.log(this.addressId);
    });
  }

  public populateValue() {

    this.service.getById(this.addressId).subscribe(
    (data:Address) => {
      this.valueModel=data;
      this.addressForm.get('addressId').setValue(this.valueModel.addressId);
      this.addressForm.get('fullName').setValue(this.valueModel.fullName);
      this.addressForm.get('addressLine').setValue(this.valueModel.addressLine);
      this.addressForm.get('city').setValue(this.valueModel.city);
      this.addressForm.get('pincode').setValue(this.valueModel.pincode);
      this.addressForm.get('state').setValue(this.valueModel.state);
      this.addressForm.get('phoneNo').setValue(this.valueModel.phoneNo);
      this.addressForm.get('otherPhoneNo').setValue(this.valueModel.otherPhoneNo);
      this.addressForm.get('addressType').setValue(this.valueModel.addressType);
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addressForm.controls[controlName].hasError(errorName);
  }
 
   public onCancel = () => {
     this.location.back();
  }
 

onSubmit(value:any){
  if (this.addressForm.valid) {
    this.addressModel=Object.assign(this.addressModel,this.addressForm.value);
    this.addressModel.userId=sessionStorage.getItem('userId');
    console.log(this.addressModel);
   
 
    this.service.updateAddress(this.addressModel).subscribe(
      (data:Address)=>{
        console.log(data);
      this.success=true;
      setTimeout(()=>this.success=false,3000);
      this.router.navigate(['address/view-address'])
    },(error)=>{
      alert("Error while during updation of address"+ error.error)
    })
  }
  else{
    console.log("Error in form");
    return;
  }
  
}

}
