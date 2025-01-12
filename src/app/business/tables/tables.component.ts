import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-tables',
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export default class TablesComponent implements OnInit{
    plants: any[] = [];
    countries: any[] = [];

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.loadPlants();
        this.loadCountries();
    }

    // Cargamos las plantas
    loadPlants(): void {
        this.apiService.getPlants().subscribe({
            next: (data) => {
                console.log('Plantas', data);
                this.plants = data;
            },
            error: (err) => console.error('Error al cargar plantas', err)
        });
    }

    // Cargamos paises
    loadCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (data) => {
                console.log('Países:', data);
                this.countries = data;
            },
            error: (err) => console.error('Error al cargar países.', err)
        });
    }

}
