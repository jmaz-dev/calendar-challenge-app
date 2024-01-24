import { TestBed } from '@angular/core/testing';

import { ValidaFormService } from './valida-form.service';

describe('ValidaFormService', () => {
  let service: ValidaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
