import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
    username = '';
    password = '';
    role = 'USER'; // Valor predeterminado

    constructor(private authService: AuthService, private router: Router) { }

    onRegister(): void {
        const payload = { username: this.username, password: this.password, role: this.role };
        this.authService.register(payload).subscribe({
            next: (response) => {
                console.log('Respuesta exitosa:', response);
                alert('Usuario registrado con éxito');
                this.router.navigate(['/login']); // Redirigir al login después del registro
            },
            error: (err) => {
                console.error('Error al registrar usuario:', err);
                alert('Usuario registrado con éxito');
                this.router.navigate(['/login']); // Redirigir al login después del registro
            },
        });
    }

}

