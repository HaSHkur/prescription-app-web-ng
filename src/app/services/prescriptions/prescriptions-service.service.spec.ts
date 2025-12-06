import { TestBed } from '@angular/core/testing';

import { PrescriptionsServiceService } from './prescriptions-service.service';

describe('PrescriptionsServiceService', () => {
  let service: PrescriptionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
