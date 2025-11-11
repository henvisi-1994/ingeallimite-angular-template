import { Injectable, inject, signal, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthStore } from './auth';
import { AuthService } from '../pages/auth/infraestructure/auth.service';

@Injectable({ providedIn: 'root' })
export class MenuStore {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);

  visible = signal(true);
  links = signal<MenuItem[]>([]);

  constructor() {
    effect(() => {
      const isAuthenticated = this.authStore.auth();
      if (!isAuthenticated) {
        this.links.set([]);
        return;
      }
      const menu: MenuItem[] = [
        { separator: true },
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-home',
              routerLink: '/',
              visible: this.authStore.can('view_reports'),
            },
          ],
        },
        {
          label: 'Documentos',
          items: [
            { label: 'Nuevo', icon: 'pi pi-plus', routerLink: '/document', visible: true },
          ],
        },
        {
          label: 'Perfil',
          items: [
            {
              label: 'Cerrar Sesión',
              icon: 'pi pi-sign-out',
              visible: true,
              command: () => this.logout(),
            },
          ],
        },
      ];

      this.links.set(menu);
    });
  }

  async logout() {
    await this.authService.logout();
  }
}
