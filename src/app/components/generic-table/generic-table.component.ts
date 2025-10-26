
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-generic-table',
    imports: [
    TableModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule
],
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() rows = 5;
  @Input() paginator = true;
  @Input() selectionMode: 'single' | 'multiple' | null = 'single';
  @Input() dataKey = 'id';

  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('dt') dt!: Table;
  selectedItem: any;

  // ✅ Determina qué usar para el filtro global
  get effectiveGlobalFilterFields(): string[] {
    return this.globalFilterFields && this.globalFilterFields.length
      ? this.globalFilterFields
      : this.columns.map(c => c.field);
  }

  // ✅ Accede a valores anidados (e.g. 'country.name')
  getNestedValue(obj: any, path: string): any {
    if (!obj || !path) return null;
    return path.split('.').reduce((value, key) => (value ? value[key] : undefined), obj);
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value?.toLowerCase() ?? '';

    // Filtro global personalizado con soporte para campos anidados
    this.dt.filteredValue = this.data.filter(item =>
      this.effectiveGlobalFilterFields.some(field => {
        const cellValue = this.getNestedValue(item, field);
        return cellValue?.toString().toLowerCase().includes(value);
      })
    );
  }

  onRowSelect(event: any) {
    this.selectionChange.emit(event.data);
  }
}
