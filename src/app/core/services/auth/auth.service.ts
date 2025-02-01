import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import jwtDecode from 'jwt-decode';
import { TokenPayload } from "../../models/model";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly tokenKey = 'token';
    private readonly apiUrl = 'https://backend-earthplant.up.railway.app/api/v1/auth';

    constructor(private httpClient: HttpClient) { }

    // Método para iniciar sesión
    login(credentials: { user: string; password: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/login`, credentials, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    // Método para registrar un usuario
    register(payload: { username: string; password: string; role: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/register`, payload);
    }

    // Guardar el token en localStorage
    saveToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.tokenKey, token);
        }
    }

    // Obtener el token desde localStorage
    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    // Verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired();
    }

    // Decodificar el token
    getDecodedToken(): TokenPayload | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            return jwtDecode<TokenPayload>(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }

    // Obtener el rol del token
    getRoleFromToken(): string | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.role : null;
    }

    // Obtener el username del token
    getUsernameFromToken(): string | null {
        const decoded = this.getDecodedToken();
        return decoded ? decoded.username : null;
    }

    // Verificar si el token está expirado
    isTokenExpired(): boolean {
        const decoded = this.getDecodedToken();
        return decoded ? Date.now() >= decoded.exp * 1000 : true;
    }

    // Método para eliminar el token
    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.tokenKey);
        }
    }


}
