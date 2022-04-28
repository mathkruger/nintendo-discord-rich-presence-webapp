/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NintendoService } from './nintendo.service';

describe('Service: Nintendo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NintendoService]
    });
  });

  it('should ...', inject([NintendoService], (service: NintendoService) => {
    expect(service).toBeTruthy();
  }));
});
