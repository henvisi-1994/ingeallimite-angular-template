import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { DockMenuComponent } from '../dock-menu/dock-menu.component';
import { MenuStore } from '../../store/menu';

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
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit {
  items: MenuItem[] | [] = [];
  menu = inject(MenuStore);
  ngOnInit() {
    this.items = this.menu.links();
  }
}
