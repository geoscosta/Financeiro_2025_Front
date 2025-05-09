
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {
  private readonly baseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    login(credentials: LoginRequest) {
        return this.httpClient.post<string>(`${this.baseUrl}/CreateToken`, credentials).pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Credenciais inválidas.'));
    }
    return throwError(() => new Error('Erro de comunicação com o servidor.'));
  }

}
