import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlantsService {
    private baseUrl = 'https://fullstack-backend-java-production-agosto.up.railway.app/api/v1/plants'; // Cambia según la URL del backend

    constructor(private http: HttpClient) { }

    // Obtener la lista de plantas
    getPlants(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/list`);
    }

    // Crear una nueva planta
    createPlant(plant: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/create`, plant);
    }

    // Actualizar una planta existente
    updatePlant(id: number, updatedData: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/update/${id}`, updatedData);
    }

    // Eliminar una planta
    deletePlant(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
