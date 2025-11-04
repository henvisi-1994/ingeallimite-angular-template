import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Repository } from '../domain/repository.interface';

export abstract class BaseRepository<T, ID = number | string> implements Repository<T, ID> {
  private  baseUrl: string ='http://api.com';
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  async findAll(): Promise<T[]> {
    return await firstValueFrom(this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`));
  }

  async findById(id: ID): Promise<T> {
    return await firstValueFrom(this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`));
  }

  async create(item: T): Promise<T> {
    return await firstValueFrom(this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item));
  }

  async update(id: ID, item: T): Promise<T> {
    return await firstValueFrom(this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, item));
  }

  async delete(id: ID): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`));
  }
}
