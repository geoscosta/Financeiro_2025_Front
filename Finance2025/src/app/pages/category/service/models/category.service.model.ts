export interface GetCategoriesFilter
{
  name: string,
  //status: StatusEnum[] | null,
  startDate: string,
  endDate: string,
  pageNumber: number;
  pageSize: number;
}

export interface Categoria
{
  Id: number;
  Nome: string;
  IdSistema: number;
}

