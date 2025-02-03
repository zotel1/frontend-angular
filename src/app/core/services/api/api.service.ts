import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Country, Plant } from '../../models/model';


@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly apiUrl = 'https://backend-earthplant.up.railway.app/api/v1';

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    // Obtener los headers con el token JWT
    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
    }

    // Obtener lista de países
    getCountries(): Observable<Country[]> {
        return this.httpClient.get<Country[]>(`${this.apiUrl}/countries`, { headers: this.getHeaders() }).pipe(
            catchError((error) => {
                console.error('Error al obtener los países:', error);
                return throwError(() => new Error('No se pudo obtener la lista de países.'));
            })
        );
    }

    // Obtener lista de plantas
    getPlants(): Observable<Plant[]> {
        return this.httpClient.get<Plant[]>(`${this.apiUrl}/plants/list`, { headers: this.getHeaders() }).pipe(
            catchError((error) => {
                console.error('Error al obtener las plantas:', error);
                return throwError(() => new Error('No se pudo obtener la lista de plantas.'));
            })
        );
    }

    getPlantDetails(plantId: number): Observable<any> {
        return this.httpClient.get(`${this.apiUrl}/plants/${plantId}`);
    }

    // Este metodo nos permite hacer peticiones a la API de paginacion
    getPaginatedPlants(page: number, size: number): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/plants/list-paginated?page=${page}&size=${size}`, { headers: this.getHeaders() });
    }
    

    // Crear nueva planta
    createPlant(plant: { nombre: string; countryName: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/plants/create`, plant, { headers: this.getHeaders() }).pipe(
            catchError((error) => {
                console.error('Error al crear la planta:', error);
                return throwError(() => new Error('No se pudo crear la planta.'));
            })
        );
    }




    // Obtener resumen
    getSummary(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/summary`, { headers: this.getHeaders() }).pipe(
            catchError((error) => {
                console.error('Error al obtener el resumen:', error);
                return throwError(() => new Error('No se pudo obtener el resumen.'));
            })
        );
    }

    deletePlant(plantId: number): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/plants/${plantId}`);
    }
    updatePlant(plant: Plant): Observable<any> {
        return this.httpClient.put(`${this.apiUrl}/plants/${plant.id}`, plant);
    }


}
