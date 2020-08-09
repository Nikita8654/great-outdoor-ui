import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRetailerProductComponent } from './update-retailer-product.component';

describe('UpdateRetailerProductComponent', () => {
  let component: UpdateRetailerProductComponent;
  let fixture: ComponentFixture<UpdateRetailerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRetailerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRetailerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
