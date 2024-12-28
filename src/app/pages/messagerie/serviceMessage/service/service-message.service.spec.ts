import { TestBed } from '@angular/core/testing';

import { ServiceMessage } from './service-message.service';

describe('ServiceMessageService', () => {
  let service: ServiceMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
