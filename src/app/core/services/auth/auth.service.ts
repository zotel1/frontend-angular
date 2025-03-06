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
    private readonly apiUrl = 'https://fullstack-backend-java-production.up.railway.app/api/v1/auth';

    constructor(private httpClient: HttpClient) { }

    register(payload: { username: string; password: string; role: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/register`, payload, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    login(credentials: { user: string; password: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/login`, credentials);
    }

    saveToken(token: string): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.tokenKey, token);
            this.authStatus.next(true);
        }
    }
    

    getToken(): string | null {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }
    

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(this.tokenKey);
        }
        this.authStatus.next(false);
    }
    

    getAuthStatus(): Observable<boolean> {
        return this.authStatus.asObservable();
    }

    getUsernameFromToken(): string | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.username : null;
    }
    
    getDecodedToken(): TokenPayload | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            return jwtDecode<TokenPayload>(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }
    
    
}