import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { PlantDetailComponent } from '../plants-detail/plant-detail.component';
import { Plant, Summary } from '../../core/models/model';
import { RouterOutlet } from '@angular/router';
import { PlantsComponent } from '../plant/plants.component';
import { SelectedPlantService } from '../../core/services/selectedPlant/selected-plant.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [CommonModule, PlantsComponent, PlantDetailComponent, RouterOutlet]
})
export class DashboardComponent implements OnInit {
    userName: string | null = null; // Nombre de usuario obtenido del token
    summary: any = null; // Datos del resumen de alertas
    totalSummary: Summary | null = null; // Datos del resumen total
    selectedPlant: Plant | null = null; // Planta seleccionada desde la tabla
    selectedPlantFlag: string | null = null; // Bandera asociada a la planta seleccionada

    constructor(
        private apiService: ApiService, 
        private authService: AuthService,
        private selectedPlantService: SelectedPlantService
    ) { }

    ngOnInit(): void {
        this.fetchSummary(); // Obtener datos del resumen
        this.fetchTotalSummary();
        this.userName = this.authService.getUsernameFromToken(); // Obtener nombre de usuario
    

    // Suscribirse a los cambios en la planta seleccionada
    this.selectedPlantService.selectedPlant$.subscribe(plant => this.selectedPlant = plant);
    this.selectedPlantService.selectedPlantFlag$.subscribe(flag => this.selectedPlantFlag = flag);
  }

    // Manejar la selección de una planta desde el componente Plants
    handlePlantSelection(event: { plant: Plant; flagUrl: string }): void {
        console.log('Planta seleccionada en Dashboard:', event);
        this.selectedPlantService.selectPlant(event.plant, event.flagUrl);
      }

    // Obtener datos del resumen
    fetchSummary(): void {
        this.apiService.getSummary().subscribe({
            next: (data) => {
                this.summary = data;
            },
            error: (err) => {
                console.error('Error al obtener el resumen:', err);
            }
        });
    }

    fetchTotalSummary(): void {
        this.apiService.getPlants().subscribe({
          next: (plants: Plant[]) => {
            this.totalSummary = {
              cantidadLecturas: plants.reduce((sum, plant) => sum + (plant.cantidadLecturas || 0), 0),
              alertasMedias: plants.reduce((sum, plant) => sum + (plant.alertasMedias || 0), 0),
              alertasRojas: plants.reduce((sum, plant) => sum + (plant.alertasRojas || 0), 0),
              sensoresInactivos: plants.reduce((sum, plant) => sum + (plant.sensoresInactivos || 0), 0),
            };
            console.log('Resumen total calculado:', this.totalSummary);
          },
          error: (err) => console.error('Error al obtener el resumen total:', err)
        });
      }
}
