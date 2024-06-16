export type PaginationType<T> = {
    items: T[];
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
};
