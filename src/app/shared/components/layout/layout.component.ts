import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Country, Plant } from '../../models/model';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export default class LayoutComponent implements OnInit {
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