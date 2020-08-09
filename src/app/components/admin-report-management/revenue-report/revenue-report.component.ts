import { Component, OnInit } from '@angular/core';
import { AdminReportService } from 'src/app/services/admin-report.service';
import { RevenueReport } from 'src/app/models/revenue-report';


@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.css']
})
export class RevenueReportComponent implements OnInit {
  
  displayedColumns: string[] = ['user', 'product', 'Price'];
  revenueList:any[]=[];
  constructor(private adminService:AdminReportService) { }

  ngOnInit(): void {
    this.getRevenueList();
  }

  getRevenueList(){
    this.adminService.getRevenueReport().subscribe((data:RevenueReport[])=>{
      
      console.log(data);
      this.revenueList=data;
      console.log(this.revenueList)
    },(err)=>{
      console.log(err.message);
    })
  }

}
