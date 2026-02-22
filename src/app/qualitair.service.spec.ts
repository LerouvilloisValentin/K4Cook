import { TestBed } from '@angular/core/testing';

import { QualitairService } from './qualitair.service';

describe('QualitairService', () => {
  let service: QualitairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualitairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
