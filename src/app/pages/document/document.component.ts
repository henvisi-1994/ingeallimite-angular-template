import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DocumentColumns } from './infraestructure/DocumentColumns';
import { Document } from './domain/Document';
import { DocumentService } from './infraestructure/document.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  }






}
