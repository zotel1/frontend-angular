import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PlantsComponent } from '../../shared/components/plants/plants.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, PlantsComponent, SidebarComponent]
})
export class DashboardComponent implements OnInit {
    userName: string | null = null;
    summary: any; // Datos del resumen
    plants: any[] = []; // Lista de plantas

    constructor(private apiService: ApiService, private authService: AuthService) { }

    ngOnInit(): void {
        this.fetchSummary();
        this.fetchPlants();
        this.userName = this.authService.getUsernameFromToken();
    }

    // Obtener datos del resumen
    fetchSummary(): void {
        this.apiService.getSummary().subscribe(
            (data) => {
                this.summary = data;
            },
            (error) => {
                console.error('Error al obtener el resumen:', error);
            }
        );
    }

    // Obtener lista de plantas
    fetchPlants(): void {
        this.apiService.getPlants().subscribe(
            (data) => {
                this.plants = data;
            },
            (error) => {
                console.error('Error al obtener plantas:', error);
            }
        );
    }
}
