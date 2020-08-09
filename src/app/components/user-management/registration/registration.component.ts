import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user:User;
  msg='';
  reEnteredPass:any
  constructor(private _router : Router,private userService:UserService) { 
    this.user=new User();
  }

  ngOnInit(): void {
  }

  registerUser(){
    this.user.userRole='RETAILER_USER';
    this.userService.addUser(this.user).subscribe((data)=>{
      console.log("response received");
      alert("Registration Success..!!");
      this._router.navigate(['/login']);
    },
    error => {
      console.log("Exception Occured");
      this.msg=error.error;
    })

}

}
