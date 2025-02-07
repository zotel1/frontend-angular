import { TestBed } from '@angular/core/testing';

import { SelectedPlantServiceService } from './selected-plant-service.service';

describe('SelectedPlantServiceService', () => {
  let service: SelectedPlantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPlantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
