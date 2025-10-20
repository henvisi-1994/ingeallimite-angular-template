
export interface Notification{
  icon?: string;
  iconColor?: string;
  iconBg?: string;
  message: string;
  amount?: string;
  amountColor?: string;
  [key: string]: any;
}
export interface NotificationGroup {
  title: string;
  items: any [];
}
