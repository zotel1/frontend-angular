import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plant } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class SelectedPlantServiceService {
  private selectedPlantSource = new BehaviorSubject<Plant | null>(null);
  selectedPlant$ = this.selectedPlantSource.asObservable();

  private selectedPlantFlagSource = new BehaviorSubject<string | null>(null);
  selectedPlantFlag$ = this.selectedPlantFlagSource.asObservable();

  selectPlant(plant: Plant, flagUrl: string) {
    this.selectedPlantSource.next(plant);
    this.selectedPlantFlagSource.next(flagUrl);
  
  }
}
