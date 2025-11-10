import { Injectable, inject, computed, NgZone, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../pages/auth/infraestructure/auth.service';

@Injectable({ providedIn: 'root' })
export class MenuStore {
  private auth = inject(AuthService);


  visible = signal<Boolean>(true);

  links = computed<MenuItem[]>(() => {
    if (!this.auth.isAuthenticated()) {
      return [];
    }

    return [
      { separator: true },
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/', visible: true },
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
  });

  async logout() {
    this.auth.logout();
  }
}
