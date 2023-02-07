import { TestBed } from '@angular/core/testing';

import { CartArrayService } from './cart-array.service';

describe('CartArrayService', () => {
  let service: CartArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
