import { TestBed } from '@angular/core/testing';

import { MicrosoftMsalService } from './microsoft-msal.service';

describe('MicrosoftMsalService', () => {
  let service: MicrosoftMsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrosoftMsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
