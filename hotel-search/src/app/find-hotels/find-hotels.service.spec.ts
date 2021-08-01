import { TestBed } from '@angular/core/testing';

import { FindHotelsService } from './find-hotels.service';

describe('FindHotelsService', () => {
  let service: FindHotelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindHotelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
