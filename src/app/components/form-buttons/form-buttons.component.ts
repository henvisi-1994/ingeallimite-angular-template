import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { BaseService } from '../../shared/infraestructure/base.service';

@Component({
  selector: 'app-form-buttons',
  imports: [ToastModule, ButtonModule, MessageModule],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss',
  providers: [MessageService],
})
export class FormButtonsComponent<T extends { id?: number }, S extends BaseService<T>> {
  /** Formulario a controlar */
  @Input() form!: NgForm;

  /** Servicio que implemente create y update */
  @Input() service!: S;

  /** Labels de los botones */
  @Input() submitLabel: string = 'Guardar';
  @Input() cancelLabel: string = 'Cancelar';

  private messageService = inject(MessageService);

  /** Enviar formulario */
  onSubmit() {
    if (!this.form || !this.service) {
      console.error('Form o service no definidos');
      return;
    }

    if (!this.form.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Form is invalid',
        life: 3000,
      });
      return;
    }

    const data: T = this.form.value;

    // Determinar si es update o create
    const action$ = data.id
      ? this.service.update(data.id,data)
      : this.service.create(data);

    action$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Form ${data.id ? 'updated' : 'created'} successfully`,
          life: 3000,
        });
        this.form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to submit form',
          life: 3000,
        });
      },
    });
  }

  /** Cancelar formulario */
  onCancel() {
    if (this.form) {
      this.form.resetForm();
    }
  }
}
