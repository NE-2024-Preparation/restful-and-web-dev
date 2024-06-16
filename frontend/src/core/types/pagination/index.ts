export type PaginationType<T> = {
    currentPage: number;
    lastPage: number;
    list: T[];
    nextPage: number;
    previousPage: number;
    total: number;
};
