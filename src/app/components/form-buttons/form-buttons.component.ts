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
export class FormButtonsComponent<
  T extends { id?: number },
  S extends BaseService<T>
> {
  @Input() service!: S;
  @Input() model!: T |any; // ← NUEVO: recibe el modelo

  @Input() submitLabel: string = 'Guardar';
  @Input() cancelLabel: string = 'Cancelar';

  /** Nuevo: evento para avisar al padre */
  @Output() cancel = new EventEmitter<void>();

  private messageService = inject(MessageService);

  onSubmit() {
    if (!this.service || !this.model) return;
    // Usa el modelo directamente en lugar de form.value
    const action$ = this.model.id
      ? this.service.update(this.model.id, this.model)
      : this.service.create(this.model);

    action$.subscribe({
      next: (result: T) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Registro ${
            this.model.id ? 'actualizado' : 'creado'
          } correctamente`,
          life: 3000,
        });
      },
      error: (err: any) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar el registro',
          life: 3000,
        });
      },
    });
  }

  onCancel() {
    this.cancel.emit(); // 🔥 Notifica al padre
  }
}
