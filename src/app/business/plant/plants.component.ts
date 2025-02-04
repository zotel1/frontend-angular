import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { Country, Plant, Summary } from '../../core/models/model';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css'],
    imports: [CommonModule, FormsModule, RouterOutlet]
})
export class PlantsComponent implements OnInit {
    @Output() plantSelected = new EventEmitter<{ plant: Plant; flagUrl: string }>();
    plants: Plant[] = [];
    countries: Country[] = [];
    plantName: string = '';
    selectedCountryName: string | null = null;
    isModalOpen = false;
    isFormSubmitted = false;
    userName: string | null = null;
    summary: Summary | null = null;
    selectedPlantId: number | null = null; // ID de la planta seleccionada
    openPlantOptionsId: number | null = null; // ID de la planta cuyo menú está abierto

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchPlants();
        this.fetchCountries();
        this.fetchSummary();
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

    // Método para seleccionar una planta al hacer clic
    selectPlant(plant: Plant): void {
        this.selectedPlantId = plant.id; // Marcar la planta como seleccionada
        const country = this.countries.find((c) => c.name === plant.countryName);
        const flagUrl = country ? country.flagUrl : 'assets/default-flag.png';
        this.plantSelected.emit({ plant, flagUrl }); // Emitir evento con la planta seleccionada
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

    // Obtiene la bandera de una planta
    getFlagForPlant(plant: Plant): string {
        const country = this.countries.find((c) => c.name === plant.countryName);
        return country ? country.flagUrl : 'assets/default-flag.png'; // Imagen por defecto si no se encuentra la bandera
    }

    // Alterna el menú desplegable
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

    // Obtiene los datos del resumen
    fetchSummary(): void {
        this.apiService.getSummary().subscribe(
            (data: Summary) => {
                this.summary = {
                    cantidadLecturas: data.cantidadLecturas || 0,
                    alertasMedias: data.alertasMedias || 0,
                    alertasRojas: data.alertasRojas || 0,
                    sensoresInactivos: data.sensoresInactivos || 0
                };
                console.log("Resumen recibido:", this.summary);
            },
            (error) => {
                console.error('Error al obtener el resumen:', error);
            }
        );
    }

    // Obtiene la lista de plantas
    fetchPlants(): void {
        this.apiService.getPlants().subscribe(
            (data: Plant[]) => {
                this.plants = data.map(plant => ({
                    ...plant,
                    cantidadLecturas: plant.cantidadLecturas || 0,
                    alertasMedias: plant.alertasMedias || 0,
                    alertasRojas: plant.alertasRojas || 0,
                    sensoresInactivos: plant.sensoresInactivos || 0,
                    countryFlagUrl: plant.countryFlagUrl || 'assets/default-flag.png'
                }));
                console.log("Plantas recibidas:", this.plants);
            },
            (error) => {
                console.error('Error al obtener plantas:', error);
            }
        );
    }

    // Crea una nueva planta
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

    // Reinicia el formulario
    resetForm(): void {
        this.plantName = '';
        this.selectedCountryName = null;
        this.isFormSubmitted = false;
    }
}
