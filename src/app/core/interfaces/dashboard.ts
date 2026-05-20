export interface DashboardApiResponse {
  success: string;
  chartDonut: ChartDataApiResponse[];
  chartBar: ChartDataApiResponse[];
  tableUsers: TableDataApiResponse[];
}

export interface ChartDataApiResponse {
  name: string;
  value: number;
}

export interface TableDataApiResponse {
  firstname: string;
  lastname: string;
  username: string;
}
