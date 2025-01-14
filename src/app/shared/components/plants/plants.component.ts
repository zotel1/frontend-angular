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
    plants: Plant[] = []; // Lista de plantas
    countries: Country[] = []; // Lista de países
    plantName: string = ''; // Nombre de la nueva planta
    selectedCountryId: number | null = null; // ID del país seleccionado
    isModalOpen = false; // Estado del modal
    isFormSubmitted = false; // Estado para validaciones del formulario
    selectedCountryName: string | null = null;


    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchPlants();
        this.fetchCountries();
    }

    // Abre el modal
    openModal(): void {
        this.isModalOpen = true;
        this.isFormSubmitted = false;
    }

    // Cierra el modal y resetea el formulario
    closeModal(): void {
        this.isModalOpen = false;
        this.resetForm();
    }

    // Obtiene la lista de plantas desde el backend
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

    // Obtiene la lista de países desde el backend
    fetchCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (response) => {
                this.countries = response;
            },
            error: (err) => {
                console.error('Error al obtener los países:', err);
            },
        });
    }

    // Crea una nueva planta
    createPlant(): void {
        if (!this.plantName || !this.selectedCountryName) {
            alert('Por favor, completa todos los campos antes de crear una planta.');
            return;
        }

        const newPlant = {
            nombre: this.plantName,
            countryName: this.selectedCountryName // Asegúrate de enviar el nombre del país
        };

        this.apiService.createPlant(newPlant).subscribe({
            next: () => {
                alert('Planta creada con éxito.');
                this.fetchPlants(); // Actualiza la lista de plantas
                this.closeModal(); // Cierra el modal
            },
            error: (err) => {
                console.error('Error al crear la planta:', err);
                alert('No se pudo crear la planta.');
            },
        });
    }
    // Resetea el formulario
    resetForm(): void {
        this.plantName = '';
        this.selectedCountryId = null;
        this.isFormSubmitted = false;
    }
}
