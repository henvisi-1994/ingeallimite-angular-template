import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DocumentColumns } from './infraestructure/DocumentColumns';
import { Document } from './domain/Document';
import { DocumentService } from './infraestructure/document.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { GenericFormComponent } from '../../components/generic-form/generic-form.component';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-document',
  imports: [
    HttpClientModule,
    GenericFormComponent,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    FloatLabel,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  providers: [DocumentService],
})
export class DocumentComponent {
  documentService = inject(DocumentService);
  public columns = DocumentColumns;
  public filters = ['nombre', 'titulo', 'descripcion'];
  public document: Document = new Document();
  private fb = inject(FormBuilder);

  disabled = false;
  public documentForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.documentForm = this.fb.group({
      nombre: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    // Escuchar cambios del formulario
    this.documentForm.valueChanges.subscribe((values) => {
      console.log('🔄 Formulario cambió:', values);
      console.log('✅ Válido:', this.documentForm.valid);
      console.log('❌ Errores:', this.documentForm.errors);
    });

    this.documentForm.statusChanges.subscribe((status) => {
      console.log('🎯 Estado:', status);
    });
  }

  shouldShowError(fieldName: string): boolean {
    const control = this.documentForm.get(fieldName);
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty);
  }

  submitForm() {
    console.log('🚀 Intentando enviar formulario...');
    this.markAllFieldsAsTouched();

    if (this.documentForm.valid) {
      console.log('✅ Formulario válido - Enviando datos...');
      // Tu lógica aquí
    } else {
      console.log('❌ Formulario inválido');
      this.logFieldErrors();
    }
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.documentForm.controls).forEach((key) => {
      this.documentForm.get(key)?.markAsTouched();
    });
  }

  private logFieldErrors() {
    Object.keys(this.documentForm.controls).forEach((key) => {
      const control = this.documentForm.get(key);
      if (control?.errors) {
        console.log(`❌ Error en ${key}:`, control.errors);
      }
    });
  }

  resetForm() {
    this.documentForm.reset();
  }

  loadData(data: Document) {
    this.documentForm.patchValue({
      nombre: data.nombre,
      titulo: data.titulo,
      descripcion: data.descripcion,
    });
  }
  onFormValueChange(values: any) {
    console.log('📨 Valores recibidos del generic-form:', values);
  }

  onFormStatusChange(status: any) {
    console.log('📨 Estado recibido del generic-form:', status);
  }
}
