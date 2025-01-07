import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component')

            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./business/authentication/register/register.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard' // Esta ruta nos redirecciona al dashboard
    }
];
