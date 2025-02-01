import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./business/authentication/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./business/authentication/register/register.component').then(m => m.RegisterComponent) },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children:
        [
            { path: 'dashboard', loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
            { path: 'plants', loadComponent: () => import('./business/plant/plants.component').then(m => m.PlantsComponent), canActivate: [AuthGuard] },
            { path: 'countries', loadComponent: () => import('./shared/components/countries/countries.component').then(m => m.CountriesComponent), canActivate: [AuthGuard] },
            { path: 'details', loadComponent: () => import('./business/plants-detail/plant-detail.component').then(m => m.PlantDetailComponent), canActivate: [AuthGuard] },
        ]
    },
    { path: '**', redirectTo: '/dashboard' }, // Ruta por defecto
     ];
     
     @NgModule({
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule],
    })
export class AppRoutingModule { }