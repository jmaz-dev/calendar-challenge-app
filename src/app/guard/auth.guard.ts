import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Session } from '../classes/session';

const session = new Session();

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/admin'];
  const token = session.getItem('token');
  const needsProfile = session.getItem('needsProfile');

  if (protectedRoutes.includes(state.url)) {
    if (!token) {
      // Redirecionar para a rota inicial se não houver token
      router.navigate(['/']);
      return false;
    } else if (needsProfile === 'true') {
      // Redirecionar para a rota de perfil completo se necessário
      router.navigate(['admin/complete-profile']);
      return false;
    }
  }
  return true;
};
