/* eslint-disable no-unused-vars */
import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type TableColumn<Entry> = {
    title: string;
    selector?: string;
    cell: (row: Entry, index: number) => ReactNode;
};

type DataTableProps<Entry> = {
    columns: TableColumn<Entry>[];
    data: Entry[];
    total: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
    lastPage: number;
    isLoading: boolean;
};

export const DataTable = <Entry extends {}>(props: DataTableProps<Entry>) => {
    const {
        columns,
        data,
        isLoading = false,
        total,
        nextPage,
        lastPage,
        currentPage,
        previousPage,
    } = props;

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [paginate, setPaginate] = useState({
        page: queryParams.get('page') ? Number(queryParams.get('page')) : 1,
        limit: queryParams.get('limit') ? Number(queryParams.get('limit')) : 10,
    });

    const updateQueryParams = (params: { page: number; limit: number }) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', params.page.toString());
        searchParams.set('limit', params.limit.toString());
        let keyword = searchParams.get('search');
        if (!keyword) searchParams.delete('search');
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    function onClickFirstPage() {
        setPaginate((prev: any) => {
            return {
                ...prev,
                page: 1,
            };
        });
    }

    function onClickLastPage() {
        setPaginate((prev: any) => {
            return {
                ...prev,
                page: lastPage,
            };
        });
    }

    function onpageSizeChange(e: any) {
        setPaginate((prev: any) => {
            return {
                ...prev,
                limit: Number(e.target.value),
            };
        });
    }

    function onClickNextPage() {
        if (paginate.limit + paginate.page >= total) return onClickLastPage();
        setPaginate((prev: any) => {
            return {
                ...prev,
                page: nextPage,
            };
        });
    }

    function onClickPreviousPage() {
        if (paginate.page - paginate.limit <= 0) return onClickFirstPage();
        setPaginate((prev: any) => {
            return {
                ...prev,
                page: previousPage,
            };
        });
    }

    useEffect(() => {
        updateQueryParams({
            page: paginate.page,
            limit: paginate.limit,
        });
    }, [paginate]);

    return (
        <div>
            <div className="w-full overflow-x-auto">
                <table className="w-full divide-y divide-gray-300 overflow-hidden whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-500">
                            <th className="py-3 px-2 text-center text-xs font-medium text-white">
                                #
                            </th>
                            {columns.map((column, key) => (
                                <th
                                    key={key}
                                    className="py-3 px-2 text-left text-xs font-medium text-white"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-dark-light hover:bg-dark-light border-2">
                            {isLoading && (
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-light py-3 px-2 text-center text-xs font-normal"
                                >
                                    One moment please ...
                                </td>
                            )}

                            {!isLoading && data.length === 0 && (
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-light py-3 px-2 text-center text-xs font-normal"
                                >
                                    No entries found
                                </td>
                            )}
                        </tr>

                        {!isLoading &&
                            data.map((element, elementKey) => (
                                <tr
                                    key={elementKey}
                                    className="border-dark-light hover:bg-dark-light border-2"
                                >
                                    <td className="text-light py-3 px-2 text-center text-xs font-normal">
                                        {paginate.limit * currentPage -
                                            paginate.limit +
                                            elementKey +
                                            1}
                                    </td>

                                    {columns.map((column, columnKey) => (
                                        <td
                                            key={columnKey}
                                            className="text-light py-3 px-2 text-left text-xs font-normal"
                                        >
                                            {column.cell(element, elementKey)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {!isLoading && data.length > 0 && (
                <div className="flex w-full flex-wrap items-center justify-between gap-2 py-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center justify-between gap-2">
                        <span className="min-w-20 cursor-pointer rounded-md bg-slate-200 p-2 px-4  duration-100 disabled:cursor-default">
                            {paginate.limit * currentPage - paginate.limit + 1}{' '}
                            - {data.length * currentPage} of {total}
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <label className="text-white">Rows/Page</label>
                            <select
                                className="text-dark block w-16 appearance-none rounded-md border-0 bg-slate-100 px-3 py-2 text-xs font-medium capitalize placeholder-gray-500 focus:outline-none focus:ring-0 disabled:bg-slate-500 disabled:text-slate-100"
                                onChange={onpageSizeChange}
                                defaultValue={10}
                                disabled={total <= 5}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value={`${total}`}>All</option>
                            </select>
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 text-xs font-medium text-gray-600">
                        <button
                            className="cursor-pointer rounded-md bg-slate-200 p-2 px-4 duration-100 hover:bg-red-500 hover:text-white disabled:cursor-default disabled:bg-slate-500 disabled:text-slate-100"
                            disabled={currentPage === 1}
                            onClick={onClickFirstPage}
                        >
                            First
                        </button>
                        <button
                            className="cursor-pointer rounded-md bg-slate-200 p-2 px-4 duration-100 hover:bg-red-500 hover:text-white disabled:cursor-default disabled:bg-slate-500 disabled:text-slate-100"
                            disabled={!previousPage}
                            onClick={onClickPreviousPage}
                        >
                            Previous
                        </button>
                        <button
                            className="cursor-pointer rounded-md bg-slate-200 p-2 px-4 duration-100 hover:bg-red-500 hover:text-white disabled:cursor-default disabled:bg-slate-500 disabled:text-slate-100"
                            disabled={!nextPage}
                            onClick={onClickNextPage}
                        >
                            Next
                        </button>
                        <button
                            className="cursor-pointer rounded-md bg-slate-200 p-2 px-4 duration-100 hover:bg-red-500 hover:text-white disabled:cursor-default disabled:bg-slate-500 disabled:text-slate-100"
                            disabled={lastPage === currentPage}
                            onClick={onClickLastPage}
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
