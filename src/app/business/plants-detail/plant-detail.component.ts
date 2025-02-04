import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../../core/models/model';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-plant-detail',
    templateUrl: './plant-detail.component.html',
    styleUrls: ['./plant-detail.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class PlantDetailComponent implements OnInit {
    plant: Plant | null = null;
    flagUrl: string = 'assets/default-flag.png'; // Bandera por defecto
    page = 0;
    pageSize = 1;

    constructor(private apiService: ApiService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadPlant();
    }

    loadPlant(): void {
        this.apiService.getPaginatedPlants(this.page, this.pageSize).subscribe(response => {
            if (response.content.length > 0) {
                this.plant = response.content[0];

                // ✅ Aquí asignamos la bandera directamente desde la API
                this.flagUrl = this.plant?.countryFlagUrl || 'assets/default-flag.png';

                if (this.plant) {
                    console.log("Planta obtenida:", this.plant);
                    console.log("Bandera URL asignada:", this.flagUrl);
                }
            }
        });
    }

    nextPlant(): void {
        this.page++;
        this.loadPlant();
    }

    prevPlant(): void {
        if (this.page > 0) {
            this.page--;
            this.loadPlant();
        }
    }
}
