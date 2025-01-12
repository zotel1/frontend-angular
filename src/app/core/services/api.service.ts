import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private BASE_URL = 'https://fullstack-backend-java-production.up.railway.app/api/v1';
    private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  // Obtenemos el token almacenado
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Agregamos el header con el token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
  }

  // Obtenemos plantas
  getPlants(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.BASE_URL}/plants`, { headers });
  }

    // Creamos una nueva plantas
    createPlants(plant: any): Observable<any> {
        const headers = this.getHeaders();
        return this.http.post(`${this.BASE_URL}/plants`, { headers });
    }

    // Obtenemos plantas
    getCountries(): Observable<any> {
        const headers = this.getHeaders();
        return this.http.get(`${this.BASE_URL}/countries`, { headers });
    }
}

