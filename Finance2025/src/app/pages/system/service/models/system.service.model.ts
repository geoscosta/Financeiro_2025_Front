export interface GetSystemFilter
{
  name: string,
  email: string,
  //status: StatusEnum[] | null,
  startDate: string,
  endDate: string,
  pageNumber: number;
  pageSize: number;
}

export interface FinancialSystem {
    Id: number;
    Name: string;
    Mes: number;
    Ano: number;
    DiaFechamento: number;
    GerarCopiaDespesa: boolean;
    MesCopia: number;
    AnoCopia: number;

    NomePropriedade:string;
    mensagem:string;
    notificacoes:[];
}

export interface CreateSystemRequest {
    name: string;
}

export interface GetSystemResponse {
  id: number;
  mes: number;
  ano: number;
  diaFechamento: number;
  gerarCopiaDespesa: boolean;
  mesCopia: number;
  anoCopia: number;
  name: string;
}

export interface GetSystemResponsePaged {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    email: string
    items: GetSystemResponse[];
}
