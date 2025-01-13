import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.getAccessToken();

        if (accessToken) {
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });
            return next.handle(clonedRequest).pipe(
                catchError(error => {
                    if (error.status === 401) {
                        // Token inválido o expirado
                        return this.authService.refreshAccessToken().pipe(
                            switchMap(() => {
                                const newAccessToken = this.authService.getAccessToken();
                                const newRequest = req.clone({
                                    headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
                                });
                                return next.handle(newRequest);
                            })
                        );
                    }
                    return throwError(() => error);
                })
            );
        }
        return next.handle(req);
    }
}
