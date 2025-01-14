import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule, CommonModule],
})
export class LoginComponent {
    user = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin(): void {
        const credentials = { user: this.user, password: this.password };
        this.authService.login(credentials).subscribe({
            next: (response: any) => {
                // Guardar el token en localStorage
                this.authService.saveToken(response.token);
                // Redirigir al dashboard
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Error de inicio de sesión:', err);
            },
        });
    }
}

