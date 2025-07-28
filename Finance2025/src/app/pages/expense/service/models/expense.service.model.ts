export interface GetExpenseFilter
{
  name: string,
  //status: StatusEnum[] | null,
  startDate: string,
  endDate: string,
  pageNumber: number;
  pageSize: number;
}

export interface Expense
{
    Id: number;
    Nome: string;
    Valor: number;
    Mes: number;
    Ano: number;
    TipoDespesa: number;
    DataCadastro: Date;
    DataAlteracao: Date;
    DataPagamento: Date;
    DataVencimento: Date;
    Pago: boolean;
    DespesaAtrasada: boolean;
    IdCategoria: number;
}
