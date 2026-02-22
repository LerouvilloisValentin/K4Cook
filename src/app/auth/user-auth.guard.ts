import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.getAuthRole().includes("ROLE_USER")){
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
