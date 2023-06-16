import { TestBed } from '@angular/core/testing';

import { ParkingSystemService } from './parking-system.service';

describe('ParkingSystemService', () => {
  let service: ParkingSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
