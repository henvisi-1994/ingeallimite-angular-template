import { MenuItem } from "primeng/api";
import { NotificationGroup } from "../domain/notification";

/** Datos estáticos */
export const PRODUCTS = [
  { name: 'Space T-Shirt', category: 'Clothing', value: 80, color: '#FF6F00' },
  { name: 'Portal Sticker', category: 'Accessories', value: 16, color: '#00BCD4' },
  { name: 'Supernova Sticker', category: 'Accessories', value: 67, color: '#E91E63' },
  { name: 'Wonders Notebook', category: 'Office', value: 35, color: '#4CAF50' },
  { name: 'Mat Black Case', category: 'Accessories', value: 75, color: '#9C27B0' },
  { name: 'Robots T-Shirt', category: 'Clothing', value: 40, color: '#009688' },
];

export const CARDS = [
  { title: 'Orders', icon: 'pi pi-shopping-cart', value: '152', subtitle: '<span class="new-count">24 new</span> since last visit' },
  { title: 'Revenue', icon: 'pi pi-dollar', value: '$2,100', subtitle: '<span class="new-count">+52%</span> since last week' },
  { title: 'Customers', icon: 'pi pi-users', value: '28,441', subtitle: '<span class="new-count">520</span> newly registered' },
  { title: 'Comments', icon: 'pi pi-comments', value: '152 Unread', subtitle: '<span class="new-count">85</span> responded' },
];

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    title: 'TODAY',
    items: [
      { icon: 'pi pi-dollar', iconColor: '#3b82f6', iconBg: '#dbeafe', message: 'Richard Jones has purchased a blue t-shirt for $amount', amount: '$79.00', amountColor: '#10b981' },
      { icon: 'pi pi-arrow-down', iconColor: '#f97316', iconBg: '#ffedd5', message: 'Your request for withdrawal of $amount has been initiated.', amount: '$2500.00', amountColor: '#10b981' },
    ],
  },
  {
    title: 'YESTERDAY',
    items: [
      { icon: 'pi pi-dollar', iconColor: '#3b82f6', iconBg: '#dbeafe', message: 'Keyser Wick has purchased a black jacket for $amount', amount: '$59.00', amountColor: '#10b981' },
      { icon: 'pi pi-question-circle', iconColor: '#ec4899', iconBg: '#fce7f3', message: 'Jane Davis has posted a new questions about your product.' },
    ],
  },
  {
    title: 'LAST WEEK',
    items: [
      { icon: 'pi pi-arrow-up', iconColor: '#10b981', iconBg: '#d1fae5', message: 'Your revenue has increased by $amount', amount: '%25', amountColor: '#10b981' },
      { icon: 'pi pi-heart', iconColor: '#ec4899', iconBg: '#fce7f3', message: '$amount users have added your products to their wishlist.', amount: '12', amountColor: '#3b82f6' },
    ],
  },
];

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Add New', icon: 'pi pi-plus' },
  { label: 'Remove', icon: 'pi pi-trash' },
];
