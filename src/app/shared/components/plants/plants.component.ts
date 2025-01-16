import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Country, Plant } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css'],
    imports: [CommonModule, FormsModule]
})
export class PlantsComponent implements OnInit {
    plants: Plant[] = [];
    countries: Country[] = [];
    plantName: string = '';
    selectedCountryName: string | null = null;
    isModalOpen = false;
    isFormSubmitted = false;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchPlants();
        this.fetchCountries();
    }

    openModal(): void {
        this.isModalOpen = true;
        this.isFormSubmitted = false;
    }

    closeModal(): void {
        this.isModalOpen = false;
        this.resetForm();
    }

    fetchPlants(): void {
        this.apiService.getPlants().subscribe({
            next: (response) => {
                this.plants = response;
            },
            error: (err) => {
                console.error('Error al obtener las plantas:', err);
                alert('No se pudo obtener la lista de plantas.');
            },
        });
    }

    fetchCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (response) => {
                // Mapear la respuesta a objetos compatibles con el modelo 'Country'
                this.countries = response.map((country: any) => ({
                    name: country.name.common,
                    flagUrl: country.flags.png,
                    flags: {
                        png: country.flags.png,
                        svg: country.flags.svg,
                        alt: country.flags.alt || '',
                    },
                }));
            },
            error: (err) => {
                console.error('Error al obtener los países:', err);
                alert('No se pudo obtener la lista de países.');
            },
        });
    }


    createPlant(): void {
        this.isFormSubmitted = true;

        if (!this.plantName || !this.selectedCountryName) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newPlant = {
            nombre: this.plantName,
            countryName: this.selectedCountryName,
        };

        this.apiService.createPlant(newPlant).subscribe({
            next: () => {
                alert('Planta creada con éxito.');
                this.fetchPlants();
                this.closeModal();
            },
            error: (err) => {
                console.error('Error al crear la planta:', err);
                alert('No se pudo crear la planta.');
            },
        });
    }

    getFlagForPlant(plantName: string): string | null {
        const country = this.countries.find((c) => c.name === plantName);
        return country ? country.flagUrl : null;
    }


    resetForm(): void {
        this.plantName = '';
        this.selectedCountryName = null;
        this.isFormSubmitted = false;
    }
}