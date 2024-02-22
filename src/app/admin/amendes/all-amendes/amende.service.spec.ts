import { TestBed } from '@angular/core/testing';

import { AmendeService } from './amende.service';

describe('AmendeService', () => {
  let service: AmendeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmendeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
