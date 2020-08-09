import { TestBed } from '@angular/core/testing';

import { ProductMasterGuard } from './product-master.guard';

describe('ProductMasterGuard', () => {
  let guard: ProductMasterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductMasterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
