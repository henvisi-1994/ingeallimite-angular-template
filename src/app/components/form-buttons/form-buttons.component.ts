import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { BaseRepository } from '../../shared/infraestructure/base.repository';

@Component({
  selector: 'app-form-buttons',
  imports: [ToastModule, ButtonModule, MessageModule],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss',
  providers: [MessageService],
})
export class FormButtonsComponent<
  T extends { id?: number },
  S extends BaseRepository<T>
> {
  @Input() service!: S;
  @Input() form!: FormGroup; // ← NUEVO: recibe el modelo

  @Input() submitLabel: string = 'Guardar';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() model?: T;
  @Input() id?: number;

  /** Nuevo: evento para avisar al padre */
  @Output() cancel = new EventEmitter<void>();

  private messageService = inject(MessageService);
  loading: boolean = false;

  async onSubmit() {
    if (!this.service) return;

    // Validar formulario si existe
    if (this.form && this.form.invalid) {
      this.markAllFieldsAsTouched();
      this.showFormErrors();
      return;
    }

    // Construir payload: si hay form usa sus datos, si no usa model
    const payload = (this.form?.value ?? this.model) as T | undefined;
    if (!payload) {
      console.warn('No hay datos para guardar.');
      return;
    }

    this.loading = true;
    try {
      let result;
      if (this.id) {
        result = await this.service.update(this.id, payload);
      } else {
        result = await this.service.create(payload);
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Registro ${this.id ? 'actualizado' : 'creado'} correctamente`,
        life: 3000,
      });

      // Resetear formulario después de guardar
      if (this.form) {
        this.form.reset();
        this.form.markAsPristine();
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al guardar el registro',
        life: 3000,
      });
    } finally {
      this.loading = false;
    }
  }

  private markAllFieldsAsTouched() {
    if (this.form) {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }
  private showFormErrors() {
    if (!this.form) return;

    const errors: string[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control?.errors) {
        errors.push(
          `Campo ${key} tiene errores: ${JSON.stringify(control.errors)}`
        );
      }
    });

    if (errors.length > 0) {
      console.warn('❌ Errores de validación:', errors);
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor, corrige los errores marcados',
        life: 3000,
      });
    }
  }

  // Método para verificar si el botón debe estar deshabilitado
  isSubmitDisabled(): boolean {
    if (this.form) {
      return this.form.invalid || this.form.pristine || this.loading;
    }
    return this.loading || !this.model;
  }
  onCancel() {
    this.cancel.emit(); // 🔥 Notifica al padre
  }
}
