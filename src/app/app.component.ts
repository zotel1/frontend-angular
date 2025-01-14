import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

/*
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html', // Ruta al archivo HTML
    styleUrls: ['./app.component.css'], // Ruta al archivo CSS
    imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}*/

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    logout(): void {
        this.authService.logout();
        this.isAuthenticated = false;
    }
}