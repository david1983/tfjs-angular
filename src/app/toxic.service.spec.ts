import { TestBed } from '@angular/core/testing';

import { ToxicService } from './toxic.service';

describe('ToxicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToxicService = TestBed.get(ToxicService);
    expect(service).toBeTruthy();
  });
});
