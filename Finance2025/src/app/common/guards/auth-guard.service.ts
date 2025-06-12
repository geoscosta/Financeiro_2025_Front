import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/models/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      // Verifica se o usuário está autenticado
      const isAuthenticated = await this.authService.isUserAuthenticated();

      if (!isAuthenticated) {
        const redirectUrl = state.url;
        return this.router.createUrlTree(['/login'], {
          queryParams: { redirect: redirectUrl },
        });
      }
      return true;
    } catch {
      return this.router.parseUrl('/login');
    }
  }
}
