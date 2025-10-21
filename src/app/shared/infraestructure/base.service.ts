import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { PageResult } from '../domain/pageResult';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T, ID = number> {
  /**
   * endpoint: e.g. '/users' (sin baseUrl).
   * baseUrl por defecto usa '' — puedes inyectar environment.apiUrl al extender.
   */
  protected baseUrl = '';
  protected endpoint = '';

  constructor(protected http: HttpClient) {}

  protected url(id?: ID): string {
    return id !== undefined && id !== null
      ? `${this.baseUrl}${this.endpoint}/${id}`
      : `${this.baseUrl}${this.endpoint}`;
  }

  // LIST / INDEX con opciones (filtros, paginación)
  list(params?: Record<string, any>): Observable<PageResult<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((k) => {
        const val = params[k];
        if (val !== undefined && val !== null) {
          httpParams = httpParams.append(k, String(val));
        }
      });
    }

    return this.http
      .get<{ data?: T[]; total?: number; page?: number; pageSize?: number }>(
        this.url(),
        { params: httpParams }
      )
      .pipe(
        map((res) => ({
          data: (res && (res.data ?? (res as unknown as T[]))) as T[],
          total: (res && res.total) ?? undefined,
          page: (res && res.page) ?? undefined,
          pageSize: (res && res.pageSize) ?? undefined,
        })),
        catchError(this.handleError)
      );
  }

  // GET by id
  get(id: ID): Observable<T> {
    return this.http.get<T>(this.url(id)).pipe(catchError(this.handleError));
  }

  // CREATE
  create(entity: Partial<T>): Observable<T> {
    return this.http
      .post<T>(this.url(), entity)
      .pipe(catchError(this.handleError));
  }

  // UPDATE (PUT full or PATCH partial). Default usa PUT.
  update(id: ID, entity: Partial<T>, { partial = false } = {}): Observable<T> {
    const method = partial ? 'patch' : 'put';
    // @ts-ignore uso dinámico de método
    return (this.http as any)
      [method]<T>(this.url(id), entity)
      .pipe(catchError(this.handleError));
  }

  // DELETE
  delete(id: ID): Observable<void> {
    return this.http
      .delete<void>(this.url(id))
      .pipe(catchError(this.handleError));
  }

  // SEARCH helper (puedes adaptar según API)
  search(term: string, extraParams?: Record<string, any>): Observable<T[]> {
    const params: Record<string, any> = { q: term, ...(extraParams ?? {}) };
    let httpParams = new HttpParams();

    Object.keys(params).forEach((k: string) => {
      const val = params[k];
      if (val !== undefined && val !== null) {
        httpParams = httpParams.append(k, String(val));
      }
    });

    return this.http
      .get<T[]>(this.url(), { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any) {
    // Aquí puedes mejorar: enviar a logging, mostrar toast, mapear códigos específicos, etc.
    const err = error?.error ?? error;
    return throwError(() => err);
  }
}
