import { TestBed } from '@angular/core/testing';

import { TransformApiResService } from './transform-api-res.service';

describe('TransformApiResService', () => {
  let service: TransformApiResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformApiResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
