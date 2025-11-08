import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Repository } from '../domain/repository.interface';

export abstract class BaseRepository<T, ID = number | string> implements Repository<T, ID> {
  private baseUrl: string = 'http://localhost:3000/api';
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  // 🔒 Método auxiliar para generar los headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o el nombre que uses
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  async findAll(): Promise<T[]> {
    return await firstValueFrom(
      this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`, { headers: this.getAuthHeaders() })
    );
  }

  async findById(id: ID): Promise<T> {
    return await firstValueFrom(
      this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`, { headers: this.getAuthHeaders() })
    );
  }

  async create(item: T): Promise<T> {
    return await firstValueFrom(
      this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item, { headers: this.getAuthHeaders() })
    );
  }

  async update(id: ID, item: T): Promise<T> {
    return await firstValueFrom(
      this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, item, { headers: this.getAuthHeaders() })
    );
  }

  async delete(id: ID): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`, { headers: this.getAuthHeaders() })
    );
  }
}
