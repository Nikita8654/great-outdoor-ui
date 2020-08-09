import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {
  reason:string;
  otherReason:string;


  reasonList:string[]=["Expected delivery date has changed and the product is arriving at a later date.","Product is being delivered to a wrong address(Customer’s mistake)",
                      "Product is not required anymore.",
                      "Cheaper alternative available for lesser price.",
                      "Bad review from friends/relatives after ordering the product."

                  ]
  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private orderService:OrderService,private router:Router,private dialogRef:MatDialogRef<CancelOrderComponent>) { }

  ngOnInit(): void {
  }
  cancelOrder(){
    this.orderService.updateOrderDispatchStatus(this.data.orderId).subscribe(
      (data)=>{
          alert("your order has been cancelled..")
          this.dialogRef.close();
          this.router.navigate(['products']);
    },(err)=>{
      alert("Error while during cancel the order..")
      this.dialogRef.close();
    })
   
    console.log(this.data.orderId);
  }

}
