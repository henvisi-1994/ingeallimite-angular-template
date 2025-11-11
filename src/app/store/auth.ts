import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../pages/auth/domain/user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly apiUrl = 'http://localhost:3000/api';

  readonly user = signal<User | null>(null);
  readonly auth = signal(false);
  readonly roles = signal<string[]>([]);
  readonly permisos = signal<string[]>([]);

  readonly nombreCompleto = computed(() => this.user()?.name ?? '');
  private readonly ADMIN = 'ADMIN';

  readonly esAdministrador = computed(
    () => this.user()?.roles?.includes(this.ADMIN) ?? false
  );

  constructor(private http: HttpClient, private router: Router) {
    effect(() => console.log('👤 Usuario actual:', this.user()));
  }

  async logout(): Promise<void> {
    this.clearUser();
    await this.router.navigate(['/auth/login']);
  }

  async getUser(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const res = await lastValueFrom(
        this.http.get<User>(`${this.apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      this.setUser(res);
    } catch (e) {
      this.clearUser();
    }
  }

  async isUserLoggedIn(): Promise<boolean> {
    if (!this.user()) {
      await this.getUser();
    }
    return this.auth();
  }

  setUser(userData: User | null) {
    this.user.set(userData);
    this.auth.set(!!userData);
    this.roles.set(userData?.roles ?? []);
    this.permisos.set(userData?.permissions ?? []);
  }

  clearUser() {
    this.user.set(null);
    this.auth.set(false);
    this.roles.set([]);
    this.permisos.set([]);
  }

  can(permiso: string): boolean {
    return this.permisos().includes(permiso);
  }
}
