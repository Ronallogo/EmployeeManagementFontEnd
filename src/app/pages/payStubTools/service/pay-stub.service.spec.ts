import { TestBed } from '@angular/core/testing';

import { PayStubService } from './pay-stub.service';

describe('PayStubService', () => {
  let service: PayStubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayStubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
