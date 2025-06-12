import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/StorageService';
import { Router } from '@angular/router';
import { User } from './user.model';
import { LoginService } from '../../LoginService';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
      private loginService: LoginService,
      private storageService: StorageService,
      private router: Router
    ) {}

    async login(email: string, password: string): Promise<boolean> {
    try {
      const token = await this.loginService.login({ email, password }).toPromise();

      if (!token)  return false;

      this.storageService.setToken(token);

      const isValid = this.validateToken(token);

      if (!isValid) {
        this.storageService.clear();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Falha no login:', error);
      return false;
    }
  }

  private validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < payload.exp * 1000; // Verifica expiração
    } catch {
      return false;
    }
  }

  // Verifica se o usuário está autenticado
  async isUserAuthenticated(): Promise<boolean> {
    const token = this.storageService.getToken();
    return this.validateToken(token);
  }
  // Logout e limpeza de dados
  logout(): void {
      this.storageService.clear();
      this.router.navigate(['/login']);
  }
  // Obtém o token
  getToken(): string {
      return this.storageService.getToken();
  }
  // Obtém dados do usuário
  getUser(): User {
      return this.storageService.getUser();
  }
}
