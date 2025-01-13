import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    private LOGIN_URL = 'https://fullstack-backend-java-production.up.railway.app/api/v1/auth/login';
    private REFRESH_URL = 'https://fullstack-backend-java-production.up.railway.app/api/v1/auth/refresh';
    private TOKEN_KEY = 'authToken';
    private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

    login(user: string, password: string): Observable<any> {
        return this.httpClient.post<any>(
            this.LOGIN_URL,
            { user, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        ).pipe(
            tap(response => {
                if (response.token) {
                    console.log(response.token);
                    this.setTokens(response.token, response.refreshToken);
                }
            }),
            catchError(error => {
                console.error('Error en la autenticación:', error);
                return throwError(() => new Error('Error en la autenticación: ' + error.message));
            })
        );
    }


    private setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }



    getAccessToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

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
  
  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
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

  logout(): void{
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
