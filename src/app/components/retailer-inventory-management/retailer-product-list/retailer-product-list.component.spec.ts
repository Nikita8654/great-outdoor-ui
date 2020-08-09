import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerProductListComponent } from './retailer-product-list.component';

describe('RetailerProductListComponent', () => {
  let component: RetailerProductListComponent;
  let fixture: ComponentFixture<RetailerProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
