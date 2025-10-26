import { Component, inject, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DocumentColumns } from './infraestructure/DocumentColumns';
import { Document } from './domain/Document';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { DocumentService } from './infraestructure/document.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FormButtonsComponent } from '../../components/form-buttons/form-buttons.component';

@Component({
  selector: 'app-document',
  imports: [
    HttpClientModule,
    TabsModule,
    GenericTableComponent,
    FormsModule,
    InputTextModule,
    MessageModule,
    FormButtonsComponent,
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  providers: [DocumentService],
})
export class DocumentComponent implements OnInit {
  documentService = inject(DocumentService);
  public columns = DocumentColumns;
  public filters = ['nombre', 'titulo', 'descripcion'];
  public documents: Document[] = [];
  public selectedDocument?: Document;
  async ngOnInit() {
    this.documents = await this.documentService.getData();
  }
  document: Document = new Document();
}
