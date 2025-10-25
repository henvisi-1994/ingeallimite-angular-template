import { Component, Input } from '@angular/core';
import { Notification, NotificationGroup } from '../../pages/dashboard/domain/notification';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  /**
   * 🔸 Grupos de notificaciones
   */
  @Input() notificationGroups: NotificationGroup[] = [];

  /**
   * 🔸 Opciones del menú contextual
   */
  @Input() menuItems: MenuItem[] = [];

  /**
   * 🔸 Función para formatear mensajes
   */
  @Input() formatFn: (item: Notification) => string = (item: Notification) =>
    this.defaultFormat(item);

  /**
   * 🔸 Formateador por defecto: reemplaza $amount con span
   */
  defaultFormat(notification: Notification): string {
    let message = notification.message;
    if (notification.amount) {
      const amountHtml = `<span class="amount" style="color: ${notification.amountColor}">${notification.amount}</span>`;
      message = message.replace('$amount', amountHtml);
    }
    return message;
  }
}
