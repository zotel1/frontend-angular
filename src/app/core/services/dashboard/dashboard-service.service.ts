
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant, Summary } from '../../models/model';


@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private baseUrl = 'https://backend-earthplant.up.railway.app/api/v1/';

    constructor(private http: HttpClient) { }

    getSummary(): Observable<Summary> {
        return this.http.get<Summary>(`${this.baseUrl}/summary/list`);
    }

    getFeaturedPlants(): Observable<Plant[]> {
        return this.http.get<Plant[]>(`${this.baseUrl}/plants/list`);
    }
}
