import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://fullstack-backend-java-production.up.railway.app/api/v1';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    // Obtener el token almacenado
    private getToken(): string | null {
        return this.authService.getToken(); // Utiliza el método del AuthService para mayor consistencia
    }

    // Crear los headers con el token
    private getHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
    }

    // Crear una nueva planta
    createPlant(plant: any): Observable<any> {
        const headers = this.getHeaders();
        return this.httpClient.post(`${this.apiUrl}/plants`, plant, { headers });
    }

    // Obtener todos los países
    getCountries(): Observable<any> {
        const headers = this.getHeaders();
        return this.httpClient.get(`${this.apiUrl}/countries`, { headers });
    }

    // Obtener todas las plantas
    getPlants(): Observable<any> {
        const headers = this.getHeaders();
        return this.httpClient.get(`${this.apiUrl}/plants`, { headers });
    }
}
