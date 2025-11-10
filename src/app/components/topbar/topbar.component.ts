import { MenubarModule } from 'primeng/menubar';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuStore } from '../../store/menu';

@Component({
  selector: 'topbar-component',
  imports: [MenubarModule, ButtonModule, AvatarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  menu = inject(MenuStore);

  items = [
    {
      icon: 'pi pi-moon',
      tooltip: 'Modo oscuro',
    },
    {
      icon: 'pi pi-globe',
      tooltip: 'Idioma',
    },
    {
      icon: 'pi pi-calendar',
      tooltip: 'Calendario',
    },
    {
      icon: 'pi pi-envelope',
      tooltip: 'Mensajes',
    },
    {
      icon: 'pi pi-user',
      tooltip: 'Perfil',
    },
  ];
  mostarMenu() {
    this.menu.visible.set(!this.menu.visible());
  }
}
