import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            role: ['USER', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { username, password, role } = this.registerForm.value;
            this.authService.register(username).subscribe({
                next: () => {
                    alert('Usuario registrado exitosamente.');
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error('Error al registrar:', err);
                    alert('No se pudo completar el registro. Intenta nuevamente.');
                },
            });
        }
    }
}