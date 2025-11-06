import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-generic-image-upload',
  imports: [CommonModule, FileUploadModule],
  templateUrl: './generic-image-upload.component.html',
  styleUrl: './generic-image-upload.component.scss',
})
export class GenericImageUploadComponent implements OnChanges {
 /** Formulario al que se asociará el valor */
  @Input() formGroup!: FormGroup;

  /** Nombre del control dentro del formulario (por ejemplo 'imagen') */
  @Input() controlName!: string;
  previewSrc: string | null = null;

  ngOnInit() {
    // ✅ Mostrar imagen inicial del backend, si existe
    const current = this.formGroup?.get(this.controlName)?.value;
    if (current) this.previewSrc = current;
  }
  ngOnChanges(changes: SimpleChanges): void {

    // ✅ Se llama cuando el backend setea el valor en el form
    if (this.formGroup && this.controlName) {
      const control = this.formGroup.get(this.controlName);
      if (control) {
        // Escucha los cambios del control
        control.valueChanges.subscribe((value) => {
          if (value && value.startsWith('data:image')) {
            console.log('value de imagen',value);

            this.previewSrc = value;
          } else {
            this.previewSrc = null;
          }
        });

        // Muestra valor inicial si ya está cargado
        const current = control.value;
        if (current && current.startsWith('data:image')) {
          this.previewSrc = current;
        }
      }
    }
  }
  /** ✅ Maneja la selección de archivo */
  onFileSelect(event: any) {
    const file = event.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.previewSrc = base64; // vista previa inmediata
      this.formGroup?.get(this.controlName)?.setValue(base64);
    };
    reader.readAsDataURL(file);
  }
}
