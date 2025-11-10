import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/infraestructure/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isAuthenticated();

  if (!isLogged) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
