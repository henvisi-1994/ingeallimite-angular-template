import { Injectable } from '@angular/core';
import { Document } from '../domain/Document';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from '../../../shared/infraestructure/base.repository';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends BaseRepository<Document> {
  protected override endpoint: string ='documents';

 constructor(protected override http: HttpClient) {
    super(http);
  }

}
