import { TestBed } from '@angular/core/testing';

import { AuditsService } from './audits.service';

describe('AuditsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditsService = TestBed.get(AuditsService);
    expect(service).toBeTruthy();
  });
});
