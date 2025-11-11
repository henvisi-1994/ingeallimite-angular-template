import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { Ripple, RippleModule } from 'primeng/ripple';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { DockMenuComponent } from '../dock-menu/dock-menu.component';
import { MenuStore } from '../../store/menu';
import { AuthService } from '../../pages/auth/infraestructure/auth.service';
import { User } from '../../pages/auth/domain/user';
import { AuthStore } from '../../store/auth';

@Component({
  selector: 'side-menu-component',
  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    DockModule,
    ButtonModule,
    DockMenuComponent,
    Ripple,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  user!: User;
  menu = inject(MenuStore);
  auth = inject(AuthStore);
  authService = inject(AuthService);

  async ngOnInit() {
    await this.auth.isUserLoggedIn(); // espera a que se cargue el usuario
    this.user = this.auth.user() ?? {
      id: 0,
      email: '',
      name: '',
      permissions: [],
      roles: [],
    };
  }

  get items(): MenuItem[] {
    return this.menu.links(); // siempre obtiene el valor actualizado del signal
  }
}
