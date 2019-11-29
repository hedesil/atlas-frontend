import { TestBed } from '@angular/core/testing';

import { VulnerabilitiesService } from './vulnerabilities.service';

describe('VulnerabilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VulnerabilitiesService = TestBed.get(VulnerabilitiesService);
    expect(service).toBeTruthy();
  });
});
