import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../pages/auth/infraestructure/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isAuthenticated();

  if (isLogged) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
