import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Expense } from './models/expense.service.model';


@Injectable({
    providedIn: 'root'
})

export class ExpenseService {

    constructor( private httpClient : HttpClient)
    {
    }

    private readonly baseURL = environment["apiUrl"];

    AdicionarDespesa(despesa:Expense)
    {
        return  this.httpClient.post<Expense>(`${this.baseURL}/AdicionarDespesa`, despesa)
    }


}
