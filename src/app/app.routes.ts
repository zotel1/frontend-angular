import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./business/authentication/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./business/authentication/register/register.component').then(m => m.RegisterComponent) },
    { path: 'dashboard', loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }, // Ruta por defecto
];
