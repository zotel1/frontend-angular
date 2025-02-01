import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import jwtDecode from 'jwt-decode';
import { TokenPayload } from "../../models/model";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly tokenKey = 'token';
    private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
    private readonly apiUrl = 'https://backend-earthplant.up.railway.app/api/v1/auth';

    constructor(private httpClient: HttpClient) { }

    login(credentials: { user: string; password: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/login`, credentials);
    }

    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.authStatus.next(true);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.authStatus.next(false);
    }

    getAuthStatus(): Observable<boolean> {
        return this.authStatus.asObservable();
    }
}