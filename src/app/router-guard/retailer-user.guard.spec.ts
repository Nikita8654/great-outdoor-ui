import { TestBed } from '@angular/core/testing';

import { RetailerUserGuard } from './retailer-user.guard';

describe('RetailerUserGuard', () => {
  let guard: RetailerUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RetailerUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
