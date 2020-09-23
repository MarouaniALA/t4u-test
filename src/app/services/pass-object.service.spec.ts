import { TestBed } from '@angular/core/testing';

import { PassObjectService } from './pass-object.service';

describe('PassObjectService', () => {
  let service: PassObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
