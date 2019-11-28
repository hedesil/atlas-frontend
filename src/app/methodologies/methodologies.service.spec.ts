import { TestBed } from '@angular/core/testing';

import { MethodologiesService } from './methodologies.service';

describe('MethodologiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MethodologiesService = TestBed.get(MethodologiesService);
    expect(service).toBeTruthy();
  });
});
