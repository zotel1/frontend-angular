import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private LOGIN_URL = 'https://fullstack-backend-java-production.up.railway.app/api/v1/auth/login';
    private REFRESH_URL = 'https://fullstack-backend-java-production.up.railway.app/api/v1/auth/refresh';
    private TOKEN_KEY = 'authToken';
    private REFRESH_TOKEN_KEY = 'refreshToken';

    constructor(private httpClient: HttpClient, private router: Router) { }

    /**
     * Método para autenticar al usuario.
     * @param user Nombre de usuario.
     * @param password Contraseña del usuario.
     */
    login(user: string, password: string): Observable<any> {
        return this.httpClient.post<any>(
            this.LOGIN_URL,
            { user, password },
            { headers: { 'Content-Type': 'application/json' } }
        ).pipe(
            tap(response => {
                if (response.token) {
                    this.setTokens(response.token, response.refreshToken);
                }
            }),
            catchError(error => {
                console.error('Error en la autenticación:', error);
                return throwError(() => new Error('Error en la autenticación: ' + error.message));
            })
        );
    }

    /**
     * Guarda el token de acceso y el token de actualización en el almacenamiento local.
     */
    private setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    /**
     * Obtiene el token de acceso almacenado.
     */
    getAccessToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Obtiene el token de actualización almacenado.
     */
    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * Actualiza el token de acceso utilizando el token de actualización.
     */
    refreshAccessToken(): Observable<any> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            this.logout();
            throw new Error('No hay token de actualización disponible.');
        }
        return this.httpClient.post<any>(this.REFRESH_URL, { refreshToken }).pipe(
            tap(response => {
                this.setTokens(response.token, response.refreshToken);
            }),
            catchError(error => {
                console.error('Error al actualizar el token:', error);
                this.logout();
                return throwError(() => new Error('Error al actualizar el token.'));
            })
        );
    }

    /**
     * Obtiene el token de acceso si no está expirado. Si está expirado, devuelve null.
     */
    public getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const isExpired = Date.now() >= payload.exp * 1000;
                return isExpired ? null : token;
            } catch (e) {
                console.error('Error al decodificar el token:', e);
                return null;
            }
        }
        return null;
    }

    /**
     * Verifica si el usuario está autenticado.
     */
    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp * 1000;
            return Date.now() < exp;
        } catch (error) {
            console.error('Token inválido: ', error);
            return false;
        }
    }

    /**
     * Cierra la sesión del usuario eliminando los tokens.
     */
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY); // Asegúrate de limpiar ambos tokens
        this.router.navigate(['/login']);
    }

    /**
     * Añade el token de acceso a las solicitudes HTTP.
     * @param headers Opcionales, si ya tienes encabezados adicionales.
     */
    addAuthHeader(headers: { [key: string]: string } = {}): { [key: string]: string } {
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }
}
