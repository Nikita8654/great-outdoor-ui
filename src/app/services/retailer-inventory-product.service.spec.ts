import { TestBed } from '@angular/core/testing';

import { RetailerInventoryProductService } from './retailer-inventory-product.service';

describe('RetailerInventoryProductService', () => {
  let service: RetailerInventoryProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailerInventoryProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
