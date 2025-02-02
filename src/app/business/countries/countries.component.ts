import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';


@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.css'],
    imports: [CommonModule, RouterOutlet]
})
export class CountriesComponent implements OnInit {
    countries: { name: string; flagUrl: string }[] = []; // Array de países

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchCountries();
    }

    fetchCountries(): void {
        this.apiService.getCountries().subscribe({
            next: (data) => {
                this.countries = data.map((country: any) => ({
                    name: country.name.common,
                    flagUrl: country.flags.png
                }));
            },
            error: (err) => {
                console.error('Error al obtener los países:', err);
            }
        });
    }}