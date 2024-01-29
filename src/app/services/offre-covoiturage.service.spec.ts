import { TestBed } from '@angular/core/testing';

import { OffreCovoiturageService } from './offre-covoiturage.service';

describe('OffreCovoiturageService', () => {
  let service: OffreCovoiturageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreCovoiturageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
