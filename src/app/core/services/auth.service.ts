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
    private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: string, password: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {user, password}, { withCredentials: true }).pipe(
        tap(response => {
            if(response.token){
                console.log(response.token);
                this.setToken(response.token);
            }
        }),
        catchError(error => {
            console.error('Error en la autenticación:', error);
            return throwError(() => new Error('Error en la autenticación: ' + error.message));
            
        })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
        return localStorage.getItem(this.tokenKey);
    }else {
        return null;
    }
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
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
