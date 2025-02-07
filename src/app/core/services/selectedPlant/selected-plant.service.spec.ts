import { TestBed } from '@angular/core/testing';

import { SelectedPlantService } from './selected-plant.service';

describe('SelectedPlantServiceService', () => {
  let service: SelectedPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
