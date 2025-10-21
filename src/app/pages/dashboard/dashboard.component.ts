import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';

// App domain/service
import { Customer } from './domain/customer';
import { CustomerService } from '../../service/dashboard/customer.service';
import { ChartService } from '../../service/shared/chart.service';
import { GenericTableComponent } from '../../component/generic-table/generic-table.component';
import { NotificationsComponent } from '../../component/notifications/notifications.component';
import { CustomerColumns } from './infraestructure/customerColumns';
import { ChartData, ChartOptions } from '../../shared/domain/chartDataset';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { PRODUCTS, CARDS, NOTIFICATION_GROUPS, MENU_ITEMS } from './data/dashboardData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ChartModule,
    MenuModule,
    ProgressBarModule,
    AvatarModule,
    GenericTableComponent,
    NotificationsComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CustomerService],
})
export class DashboardComponent implements OnInit {
 private readonly cd = inject(ChangeDetectorRef);
  private readonly customerService = inject(CustomerService);
  private readonly chartService = inject(ChartService);

  public columns = CustomerColumns;
  public filters = ['name', 'country.name', 'representative.name', 'status'];
  public customers: Customer[] = [];
  public selectedCustomer?: Customer;

  public data!: ChartData;
  public options!: ChartOptions;

  public products = PRODUCTS;
  public cards = CARDS;
  public notificationGroups = NOTIFICATION_GROUPS;
  public items = MENU_ITEMS;

  async ngOnInit() {
    this.customers = await this.customerService.getCustomersSmall();
    this.initChart();
  }

  private initChart(): void {
    const chart = this.chartService.getChartConfig({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        { label: 'Dataset 1', data: [50, 25, 12, 48, 90, 76, 42], color: '--p-cyan-500' },
        { label: 'Dataset 2', data: [21, 84, 24, 75, 37, 65, 34], color: '--p-gray-500' },
        { label: 'Dataset 3', data: [41, 52, 24, 74, 23, 21, 32], color: '--p-orange-500' },
      ],
      type: 'bar',
      stacked: true,
    });

    if (chart) {
      this.data = chart.data;
      this.options = chart.options;
      this.cd.markForCheck();
    }
  }
}
