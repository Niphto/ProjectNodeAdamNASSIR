import { TestBed } from '@angular/core/testing';

import { WorkDataService } from './work-data.service';

describe('WorkDataService', () => {
  let service: WorkDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
