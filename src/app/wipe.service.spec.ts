import { TestBed } from '@angular/core/testing';

import { WipeService } from './wipe.service';

describe('WipeService', () => {
  let service: WipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
