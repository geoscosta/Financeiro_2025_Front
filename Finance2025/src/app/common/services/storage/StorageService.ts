import { Injectable } from "@angular/core";
import { User } from "../auth/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // === Funções Genéricas Base64 ===
  private encode(value: string): string {
    return btoa(encodeURIComponent(value));
  }

  private decode(value: string): string {
    try {
      return decodeURIComponent(atob(value));
    } catch {
      return '';
    }
  }

  // === Limpeza Total ===
  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // === Token ===
  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY) || '';
    return this.decode(token);
  }

  setToken(token: string): void {
    console.log('Token recebido para armazenamento:', token);
    localStorage.setItem(this.TOKEN_KEY, this.encode(token));
  }

  // === Usuário (objeto JSON) ===
  getUser(): User {
    const userData = localStorage.getItem(this.USER_KEY) || '';
    try {
      return JSON.parse(this.decode(userData));
    } catch {
      return {} as User;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, this.encode(JSON.stringify(user)));
  }
}
