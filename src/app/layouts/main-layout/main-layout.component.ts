import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { MenuStore } from '../../store/menu';
import { AuthStore } from '../../store/auth';

@Component({
  selector: 'app-main-layout',
    imports: [RouterOutlet, SideMenuComponent, TopbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent  implements OnInit{
  menu = inject(MenuStore);
isMobile = window.innerWidth <= 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }
   get marginLeft(): string {
    if (!this.menu.visible()) return '0';
    return this.isMobile ? '15%' : '2%';
  }
   constructor(private authStore: AuthStore) {}

  async ngOnInit() {
    await this.authStore.getUser();
  }
}
