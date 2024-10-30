import { TestBed } from '@angular/core/testing';

import { ServiceMessageService } from './service-message.service';

describe('ServiceMessageService', () => {
  let service: ServiceMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
