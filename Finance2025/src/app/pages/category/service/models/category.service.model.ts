export interface GetCategoriesFilter
{
  name: string,
  //status: StatusEnum[] | null,
  startDate: string,
  endDate: string,
  pageNumber: number;
  pageSize: number;
}
