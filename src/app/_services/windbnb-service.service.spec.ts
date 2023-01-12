import { TestBed } from '@angular/core/testing';

import { WindbnbServiceService } from './windbnb-service.service';

describe('WindbnbServiceService', () => {
  let service: WindbnbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindbnbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
