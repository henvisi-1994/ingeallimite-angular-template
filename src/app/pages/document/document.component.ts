import { Component, inject, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DocumentColumns } from './infraestructure/DocumentColumns';
import { Document } from './domain/Document';
import { DocumentService } from './infraestructure/document.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { GenericFormComponent } from '../../components/generic-form/generic-form.component';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-document',
  imports: [HttpClientModule, GenericFormComponent, FormsModule, MessageModule,InputTextModule,FloatLabel],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  providers: [DocumentService],
})
export class DocumentComponent {
  documentService = inject(DocumentService);
  public columns = DocumentColumns;
  public filters = ['nombre', 'titulo', 'descripcion'];
  public selectedDocument?: Document;
  public document: Document = new Document();
  disabled = false;

}
