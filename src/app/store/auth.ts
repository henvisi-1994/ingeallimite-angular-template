import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../pages/auth/domain/user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly apiUrl = 'http://localhost:3000/api';

  // ⚡ Signals (estado reactivo)
  readonly user = signal<User | null>(null);
  readonly auth = signal(false);
  readonly roles = signal<string[]>([]);
  readonly permisos = signal<string[]>([]);

  // 🔁 Computed
  readonly nombreCompleto = computed(() => {
    const u = this.user();
    return u ? u.name : '';
  });

  private readonly ADMIN = 'ADMIN';

  readonly esAdministrador = computed(
    () => this.user()?.roles?.includes(this.ADMIN) ?? false
  );

  constructor(private http: HttpClient, private router: Router) {
    // Efecto opcional: debug de cambios
    effect(() => {
      console.log('👤 Usuario actual:', this.user());
    });
  }

  // 🚪 Logout
  async logout(): Promise<void> {
    try {
      this.clearUser();
      this.router.navigate(['/auth/login']);
    } catch {
      // No pasa nada si falla
    }
  }

  // 👁️ Obtener usuario actual
  async getUser(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const res: any = await lastValueFrom(
        this.http.get(`${this.apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      this.setUser(res);
      this.permisos.set(res.permisos);
      this.roles.set(res.roles);
    } catch (e) {
      this.clearUser();
    }
  }

  // 🔑 Verificar sesión actual
  async isUserLoggedIn(): Promise<boolean> {
    if (!this.user()) {
      await this.getUser();
    }
    return this.auth();
  }

  // 🎯 Helpers
  setUser(userData: User | null) {
    this.user.set(userData);
    this.auth.set(!!userData);
  }

  clearUser() {
    this.user.set(null);
    this.auth.set(false);
    this.roles.set([]);
    this.permisos.set([]);
  }

  can(permiso: string): boolean {
    return this.permisos()?.includes(permiso) ?? false;
  }
}
