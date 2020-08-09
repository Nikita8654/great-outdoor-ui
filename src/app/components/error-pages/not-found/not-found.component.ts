import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  public errorMessage = '404 , Page Not Found !!!!Sry for inconvenience';
  constructor() { }

  ngOnInit(): void {
  }

}
