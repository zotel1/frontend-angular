import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    imports: [CommonModule, RouterModule]
})
export class SidebarComponent { 
    menus = [
        {
            id: 1,
            path: 'M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM2 10C2 9.101 2.156 8.238 2.431 7.431L4 9L6 11V13L8 15L9 16V17.931C5.061 17.436 2 14.072 2 10ZM16.33 14.873C15.677 14.347 14.687 14 14 14V13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11H8V8C8.53043 8 9.03914 7.78929 9.41421 7.41421C9.78929 7.03914 10 6.53043 10 6V5H11C11.5304 5 12.0391 4.78929 12.4142 4.41421C12.7893 4.03914 13 3.53043 13 3V2.589C15.928 3.778 18 6.65 18 10C17.9998 11.7647 17.4123 13.4791 16.33 14.873Z',
            isSelected: false,
        },
        {
            id: 2,
            path: 'M4 0V2H12V3H3C2.20435 3 1.44129 3.31607 0.87868 3.87868C0.31607 4.44129 0 5.20435 0 6L0 12C0 12.7956 0.31607 13.5587 0.87868 14.1213C1.44129 14.6839 2.20435 15 3 15H15C15.7526 15.0001 16.4778 14.7173 17.0316 14.2077C17.5854 13.6981 17.9275 12.999 17.99 12.249L24 13V5L17.99 5.751C17.9275 5.00099 17.5854 4.30186 17.0316 3.79228C16.4778 3.2827 15.7526 2.99991 15 3H14V1C14 0.734784 13.8946 0.48043 13.7071 0.292893C13.5196 0.105357 13.2652 0 13 0H4ZM18 7.766V10.234L22 10.734V7.266L18 7.766ZM16 6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12V6Z',
            isSelected: false,
        },
        // Agrega más íconos aquí
    ];
    constructor(private authService: AuthService, private router: Router) { }


    selectMenu(menu: any): void {
        this.menus.forEach((m) => (m.isSelected = false));
        menu.isSelected = true;
    }
    logout(): void {
        this.authService.logout(); // Este método debería eliminar el token o limpiar el estado de sesión
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
    }
}
