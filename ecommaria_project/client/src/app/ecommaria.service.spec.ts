import { TestBed } from '@angular/core/testing';

import { EcommariaService } from './ecommaria.service';

describe('EcommariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcommariaService = TestBed.get(EcommariaService);
    expect(service).toBeTruthy();
  });
});
