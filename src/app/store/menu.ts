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
        label: 'Documentos',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-plus',
            shortcut: '⌘+N',
            visible: true,
          },
          {
            label: 'Buscar',
            icon: 'pi pi-search',
            shortcut: '⌘+S',
            visible: true,
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
      console.log('Menú actualizado:', this.links());
    });
  }
}
