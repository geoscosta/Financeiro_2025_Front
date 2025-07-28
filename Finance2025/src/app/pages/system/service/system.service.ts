import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FinancialSystem, GetSystemFilter, GetSystemResponse, GetSystemResponsePaged } from './models/system.service.model';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class SystemService {

    constructor( private httpClient : HttpClient) {}

    private serializeQueryParams(obj: any): any {
    let queryBuilder = new HttpParams();

    Object.keys(obj).forEach((k) => {
      if (Array.isArray(obj[k])) {
        (obj[k] as []).forEach(
          (value) => (queryBuilder = queryBuilder.append(k, value))
        );
      } else if (obj[k]) {
        queryBuilder = queryBuilder.append(k, obj[k]);
      }
    });

    return queryBuilder;
  }

    private readonly baseURL = environment["apiUrl"];

    AdicionarSistemaFinanceiro(sistemaFinanceiro:FinancialSystem)
    {
        return  this.httpClient.post<FinancialSystem>(`${this.baseURL}/AdicionarSistemaFinanceiro`, sistemaFinanceiro)
    }

    ListaSistemasUsuario(filter: GetSystemFilter): Observable<GetSystemResponse[]>
    {
        const params = new HttpParams().set('emailUsuario', filter.email);
        return  this.httpClient.get<GetSystemResponse[]>(`${this.baseURL}/ListaSistemasUsuario`, { params });
    }

    CadastrarUsuarioNoSistema(idSistema: number, emailUsuario : string)
    {
        return  this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`,null)
    }


}
