import { inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterResponse } from '../domain/registerResponse';
import { LoginResponse } from '../domain/loginResponse';
import { User } from '../domain/user';
import { Router } from '@angular/router';
import { AuthStore } from '../../../store/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  private router = inject(Router);
  private ngZone = inject(NgZone);
    private auth = inject(AuthStore);

  // ============ Registro ============
  register(data: {
    email: string;
    password: string;
    name: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  // ============ Login ============
  login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        // Guarda el token y usuario en localStorage
        localStorage.setItem('token', res.token);
        this.auth.setUser(res.user)
      })
    );
  }

  // ============ Logout ============
  logout(): void {
    localStorage.removeItem('token');
     this.auth.logout()
    this.ngZone.run(async () => {
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    });
  }

  // ============ Helpers ============
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
