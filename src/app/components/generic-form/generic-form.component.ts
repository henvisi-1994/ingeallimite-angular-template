import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms'; // ← Agregar
import { TabsModule } from 'primeng/tabs';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { ModelBase } from '../../shared/domain/modelBase';
import { BaseRepository } from '../../shared/infraestructure/base.repository';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ← Agregar
    TabsModule,
    FormButtonsComponent,
    GenericTableComponent,
  ],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent<
  T extends ModelBase,
  S extends BaseRepository<T>
> implements AfterViewInit
{
  /** Entradas */
  @Input() service!: S;
  @Input() columns: any[] = [];
  @Input() filters: string[] = [];
  @Input() disabled = false;
  @Input() formGroup!: FormGroup; // ← Nueva entrada para Reactive Forms
  id!: number;
  /** Plantilla del formulario proyectado */
  @ContentChild('formFields', { static: false })
  formFieldsTpl!: TemplateRef<any>;
  @ViewChild('form', { static: false }) form!: NgForm;

  /** Salidas para Reactive Forms */
  @Output() formValueChange = new EventEmitter<any>();
  @Output() formStatusChange = new EventEmitter<any>();

  /** Otros */
  activeIndex = '0';
  data: T[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    if (this.service && typeof this.service.findAll === 'function') {
      this.data = await this.service.findAll();
    }

    // Si tenemos un FormGroup reactivo, escuchar sus cambios
    if (this.formGroup) {
      this.formGroup.valueChanges.subscribe((values) => {
        this.formValueChange.emit(values);
      });

      this.formGroup.statusChanges.subscribe((status) => {
        this.formStatusChange.emit(status);
      });
    }
  }

  ngAfterViewInit() {
    if (this.formGroup) {
      // Si usamos Reactive Forms, no necesitamos el NgForm template-driven
      return;
    }

    // 👇 Solo para Template-Driven Forms
    queueMicrotask(() => {
      if (!this.form) {
        console.warn('⚠️ NgForm aún no está disponible en AfterViewInit');
        return;
      }

      this.form.statusChanges?.subscribe(() => this.emitErrors());
      this.form.valueChanges?.subscribe(() => this.emitErrors());
      this.emitErrors();
      this.cd.detectChanges();
    });
  }

  emitErrors() {
    if (!this.form) return;

    const errores: any = {};
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      if (control.errors) {
        errores[key] = control.errors;
      }
    });
  }

  onModelChange() {
    this.emitErrors();
  }

  // Resto de tus métodos...
  onCancelForm() {
    this.disabled = false;
    if (this.formGroup) {
      this.formGroup.reset();
    }
  }

  onEdit(item: T, form: NgForm) {
    if (this.formGroup) {
      this.id = item.id ?? 0;
      this.formGroup.patchValue(item);
      this.formGroup.markAsPristine();
    } else {
      form.form.markAsPristine();
    }
    this.disabled = false;
    this.activeIndex = '0';
  }

  onView(item: T) {
    if (this.formGroup) {
      this.formGroup.patchValue(item);
      this.formGroup.disable();
    }
    this.disabled = true;
    this.activeIndex = '0';
  }

  onDelete(item: T) {
    this.service.delete;
    this.data = this.data.filter((d) => d.id !== item.id);
  }
}
