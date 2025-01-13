import { Component } from '@angular/core';
import { Country, Plant } from '../../shared/models/model';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
    plants: Plant[] = [];
    countries: Country[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.loadPlants();
        this.loadCountries();
    }

    // Cargar plantas
    loadPlants(): void {
        this.apiService.getPlants().subscribe({
            next: (data) => {
                console.log('Plantas:', data);
                this.plants = data;
            },
            error: (err) => console.error('Error al cargar plantas:', err),
        });
    }

    // Cargar países
    loadCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (data) => {
                console.log('Países:', data);
                this.countries = data;
            },
            error: (err) => console.error('Error al cargar países:', err),
        });
    }

}
