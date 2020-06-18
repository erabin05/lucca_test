import { TestBed } from '@angular/core/testing';

import { AsideStatusService } from './aside-status.service';

describe('AsideStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsideStatusService = TestBed.get(AsideStatusService);
    expect(service).toBeTruthy();
  });
});
