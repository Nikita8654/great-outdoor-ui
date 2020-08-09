import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetailerProductComponent } from './add-retailer-product.component';

describe('AddRetailerProductComponent', () => {
  let component: AddRetailerProductComponent;
  let fixture: ComponentFixture<AddRetailerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRetailerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetailerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
