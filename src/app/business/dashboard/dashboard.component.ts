import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { PlantsComponent } from '../../shared/components/plants/plants.component';
import { PlantDetailComponent } from '../plants-detail/plant-detail.component';
import { Plant } from '../../core/models/model';
import { RouterOutlet } from '@angular/router';

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
    selectedPlant: Plant | null = null; // Planta seleccionada desde la tabla
    selectedPlantFlag: string | null = null; // Bandera asociada a la planta seleccionada

    constructor(private apiService: ApiService, private authService: AuthService) { }

    ngOnInit(): void {
        this.fetchSummary(); // Obtener datos del resumen
        this.userName = this.authService.getUsernameFromToken(); // Obtener nombre de usuario
    }

    // Manejar la selección de una planta desde el componente Plants
    handlePlantSelection(event: { plant: Plant; flagUrl: string }): void {
        console.log('Planta seleccionada en Dashboard:', event);
        this.selectedPlant = event.plant;
        this.selectedPlantFlag = event.flagUrl;
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
}
