
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'dock-menu',
    imports: [DockModule, RadioButtonModule, FormsModule],
    templateUrl: './dock-menu.component.html',
    styleUrl: './dock-menu.component.scss'
})
export class DockMenuComponent implements OnInit {
    // Recibe los items del menú lateral
    @Input() menuItems: MenuItem[] = [];

    // Items transformados para el dock
    dockItems: MenuItem[] = [];

    position: string = 'bottom';

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

    ngOnInit() {
        this.transformMenuItemsToDockItems();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['menuItems']) {
            this.transformMenuItemsToDockItems();
        }
    }

    private transformMenuItemsToDockItems() {
        if (!this.menuItems) {
            this.dockItems = [];
            return;
        }

        this.dockItems = this.flattenMenuItems(this.menuItems)
            .filter(item => item.visible !== false) // Filtra items no visibles
            .map(item => ({
                label: item.label || '',
                icon: item.icon,
                command: item.command,
                tooltip: item.label,
                tooltipOptions: {
                    position: 'top'
                } as any // Usamos 'as any' para evitar problemas de tipos
            }));
    }

    private flattenMenuItems(items: MenuItem[]): MenuItem[] {
        const flattened: MenuItem[] = [];

        items.forEach(item => {
            // Ignorar separadores
            if (item.separator) {
                return;
            }

            // Si el item tiene subitems, aplanarlos recursivamente
            if (item.items && item.items.length > 0) {
                flattened.push(...this.flattenMenuItems(item.items));
            } else if (item.label && item.icon) {
                // Solo agregar items que tengan label e icon
                flattened.push(item);
            }
        });

        return flattened;
    }}
