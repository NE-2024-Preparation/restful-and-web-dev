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
        pageNumber: queryParams.get('pageNumber')
            ? Number(queryParams.get('pageNumber'))
            : 0,
        pageSize: queryParams.get('pageSize')
            ? Number(queryParams.get('pageSize'))
            : 10,
    });

    const updateQueryParams = (params: {
        pageNumber: number;
        pageSize: number;
    }) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('pageNumber', params.pageNumber.toString());
        searchParams.set('pageSize', params.pageSize.toString());
        let keyword = searchParams.get('search');
        if(!keyword) searchParams.delete('search');
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    function onClickFirstPage() {
        setPaginate((prev: any) => {
            return {
                ...prev,
                pageNumber: 1,
            };
        });
    }

    function onClickLastPage() {
        setPaginate((prev: any) => {
            return {
                ...prev,
                pageNumber: lastPage,
            };
        });
    }

    function onpageSizeChange(e: any) {
        setPaginate((prev: any) => {
            return {
                ...prev,
                pageSize: Number(e.target.value),
            };
        });
    }

    function onClickNextPage() {
        if (paginate.pageSize + paginate.pageNumber >= total)
            return onClickLastPage();
        setPaginate((prev: any) => {
            return {
                ...prev,
                pageNumber: nextPage,
            };
        });
    }

    function onClickPreviousPage() {
        if (paginate.pageNumber - paginate.pageSize <= 0)
            return onClickFirstPage();
        setPaginate((prev: any) => {
            return {
                ...prev,
                pageNumber: previousPage,
            };
        });
    }

    useEffect(() => {
        updateQueryParams({
            pageNumber: paginate.pageNumber,
            pageSize: paginate.pageSize,
        });
    }, [paginate]);

    return (
        <div>
            <div className="w-full overflow-x-auto">
                <table className="divide-gray-300 w-full divide-y overflow-hidden whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-500">
                            <th className="py-3 px-2 text-center text-sm font-medium text-white">
                                #
                            </th>
                            {columns.map((column, key) => (
                                <th
                                    key={key}
                                    className="py-3 px-2 text-left text-sm font-medium text-white"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-2 border-dark-light hover:bg-dark-light">
                            {isLoading && (
                                <td
                                    colSpan={columns.length + 1}
                                    className="py-3 px-2 text-center text-sm font-normal text-light"
                                >
                                    One moment please ...
                                </td>
                            )}

                            {!isLoading && data.length === 0 && (
                                <td
                                    colSpan={columns.length + 1}
                                    className="py-3 px-2 text-center text-sm font-normal text-light"
                                >
                                    No entries found
                                </td>
                            )}
                        </tr>

                        {!isLoading &&
                            data.map((element, elementKey) => (
                                <tr
                                    key={elementKey}
                                    className="border-2 border-dark-light hover:bg-dark-light"
                                >
                                    <td className="py-3 px-2 text-center text-sm font-normal text-light">
                                        {paginate.pageSize * currentPage -
                                            paginate.pageSize +
                                            elementKey +
                                            1}
                                    </td>

                                    {columns.map((column, columnKey) => (
                                        <td
                                            key={columnKey}
                                            className="py-3 px-2 text-left text-sm font-normal text-light"
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
                <div className="text-gray-600 flex w-full flex-wrap items-center justify-between gap-2 py-4 text-sm font-medium">
                    <div className="flex items-center justify-between gap-2">
                        <span className="min-w-20 cursor-pointer rounded-md bg-slate-200 p-2 px-4  duration-100 disabled:cursor-default">
                            {paginate.pageSize * currentPage -
                                paginate.pageSize +
                                1}{' '}
                            - {data.length * currentPage} of {total}
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <label className="text-white">Rows/Page</label>
                            <select
                                className="placeholder-gray-500 block w-16 appearance-none rounded-md border-0 bg-slate-100 px-3 text-base font-medium capitalize text-dark focus:outline-none focus:ring-0 disabled:bg-slate-500 disabled:text-slate-100"
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

                    <div className="text-gray-600 flex flex-wrap justify-end gap-2 text-sm font-medium">
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
