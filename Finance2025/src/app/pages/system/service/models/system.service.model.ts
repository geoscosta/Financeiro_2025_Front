export interface GetSystemFilter
{
  name: string,
  //status: StatusEnum[] | null,
  startDate: string,
  endDate: string,
  pageNumber: number;
  pageSize: number;
}
