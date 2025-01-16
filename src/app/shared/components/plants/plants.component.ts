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


    // Abre el modal
    openModal(): void {
        this.isModalOpen = true;
        this.isFormSubmitted = false;
        this.resetForm(); // Limpia el formulario al abrir el modal
    }

    // Cierra el modal
    closeModal(): void {
        this.isModalOpen = false;
        this.resetForm();
    }

    // Obtiene las plantas desde la API
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

    // Obtiene los países desde la API
    fetchCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (response) => {
                this.countries = response.map((country: any) => ({
                    name: country.name.common,
                    flagUrl: country.flags.png,
                }));
            },
            error: (err) => {
                console.error('Error al obtener los países:', err);
                alert('No se pudo obtener la lista de países.');
            },
        });
    }

    openPlantOptionsId: number | null = null; // Almacena la planta cuyo menú está abierto

    // Método para alternar el menú desplegable
    toggleOptions(plantId: number): void {
        this.openPlantOptionsId = this.openPlantOptionsId === plantId ? null : plantId;
    }

    // Método para editar una planta
    editPlant(plant: Plant): void {
        console.log('Editar planta:', plant);
        alert(`Editar planta: ${plant.nombre}`);
    }

    // Método para eliminar una planta
    deletePlant(plantId: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta planta?')) {
            console.log('Eliminar planta con ID:', plantId);
            alert(`Planta con ID ${plantId} eliminada.`);
        }
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

    getFlagForPlant(plant: Plant): string {
        const country = this.countries.find((c) => c.name === plant.countryName);
        return country ? country.flagUrl : 'assets/default-flag.png'; // Imagen por defecto si no se encuentra la bandera
    }


    resetForm(): void {
        this.plantName = '';
        this.selectedCountryName = null;
        this.isFormSubmitted = false;
    }

}