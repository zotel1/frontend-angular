import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent implements OnInit {
    plants: any[] = [];
    countries: any[] = [];

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
            error: (err) => console.error('Error al cargar plantas', err)
        });
    }

    // Cargar países
    loadCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (data) => {
                console.log('Países:', data);
                this.countries = data;
            },
            error: (err) => console.error('Error al cargar países', err)
        });
    }
}