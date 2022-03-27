import { TestBed } from '@angular/core/testing';

import { TruthtableService } from './truthtable.service';

describe('TruthtableService', () => {
  let service: TruthtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruthtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
