export type ResponsePagination<T> = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  results: T[];
};
