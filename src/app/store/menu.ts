import { Injectable, signal, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class MenuStore {
  // 🧩 Estado: signal reactivo del menú
  links = signal<MenuItem[]>([
    {
      separator: true,
    },
    {
      label: 'Home',
      items: [
        {
          label: 'Dashboard',

          icon: 'pi pi-plus',
          shortcut: '⌘+N',
          routerLink: '/',
          visible: true,
        },
      ],
    },
    {
      label: 'Documentos',
      items: [
        {
          label: 'Nuevo',
          icon: 'pi pi-plus',
          shortcut: '⌘+N',
          routerLink: '/document',
          visible: true,
        },
        {
          label: 'Buscar',
          icon: 'pi pi-search',
          shortcut: '⌘+S',
          visible: false,
        },
      ],
    },
    {
      label: 'Perfil',
      items: [
        {
          label: 'Configuracion',
          icon: 'pi pi-cog',
          shortcut: '⌘+O',
          visible: true,
        },
        {
          label: 'Mensajes',
          icon: 'pi pi-inbox',
          badge: '2',
          visible: true,
        },
        {
          label: 'Cerrar Sesion',
          icon: 'pi pi-sign-out',
          shortcut: '⌘+Q',
          visible: true,
        },
      ],
    },
    {
      separator: true,
    },
  ]);

  constructor() {
    effect(() => {
    });
  }
}
