import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.getAuthRole().includes("ROLE_ADMIN")){
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
