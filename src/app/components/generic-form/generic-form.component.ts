import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { BaseService } from '../../shared/infraestructure/base.service';
import { ModelBase } from '../../shared/domain/modelBase';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    FormButtonsComponent,
    GenericTableComponent,
  ],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent<
  T extends ModelBase,
  S extends BaseService<T>
> {
  /** Modelo */
  @Input() model!: T;

  /** Servicio asociado (para CRUD) */
  @Input() service!: S;

  /** Columnas de la tabla */
  @Input() columns: any[] = [];

  /** Campos de filtro global */
  @Input() filters: string[] = [];

  /** Estado del formulario (editable o no) */
  @Input() disabled = false;

  /** Índice activo del tab */
  activeIndex = '0';

  /** Template proyectado del formulario */
  @ContentChild('formFields', { static: false })
  formFieldsTpl!: TemplateRef<any>;

  /** Datos de la tabla */
  data: T[] = [];

  // === Eventos ===
  onCancelForm() {
    this.model.hydrate({});
    this.disabled = false;
  }
ngAfterContentInit() {
  console.log('Template capturado:', this.formFieldsTpl);
}
  onEdit(item: T, form: NgForm) {
    this.model.hydrate(item);
    form.form.markAsPristine();
    this.disabled = false;
    this.activeIndex = '0';
  }

  onView(item: T) {
    this.model.hydrate(item);
    this.disabled = true;
    this.activeIndex = '0';
  }

  onDelete(item: T) {
    this.service.delete(item.id!).subscribe(() => {
      this.data = this.data.filter((d) => d.id !== item.id);
    });
  }

  async ngOnInit() {
    if (this.service && typeof this.service['getData'] === 'function') {
      this.data = await this.service['getData']();
    }
  }
}
