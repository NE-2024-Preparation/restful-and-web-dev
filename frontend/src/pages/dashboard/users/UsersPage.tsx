/* eslint-disable no-unused-vars */
import { DataTable, TableColumn } from '~/components/elements';
import { useEffect, useState } from 'react';
import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserType } from '~/core/types';
import { PaginationType } from '~/core/types/pagination';
import { useExportContext } from '~/core/provider/export/ExportContextProvider';
import { exportUsers } from '~/core/helper';
import { get_users } from '~/api/user';

export const UsersPage = () => {
    const location = useLocation();

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const [users, setUsers] = useState<PaginationType<UserType>>();

    const [keyword, setKeyword] = useState('');

    const { setExportData } = useExportContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const updateQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('search', keyword.toString());
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const data = await get_users(query);
            setUsers(data.payload);
            setExportData(exportUsers(data.payload.items ?? []));
        } catch (error) {
            toast.error('Error getting users');
        } finally {
            setIsLoading(false);
        }
    };

    const columns: TableColumn<UserType>[] = [
        {
            title: 'Username',
            cell: row => row.username,
        },
        {
            title: 'Email',
            cell: row => row.email,
        },
        {
            title: 'Status',
            cell: row => row.status,
        },
        {
            title: 'Actions',
            cell: row => (
                <div className="flex gap-3">
                    <TrashIcon className="w-5 cursor-pointer" />
                    <PencilAltIcon className="w-5 cursor-pointer" />
                    <EyeIcon className="w-5 cursor-pointer" />
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (keyword) updateQueryParams();
    }, [keyword]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('pageNumber') && searchParams.has('pageSize'))
            handleGetUsers();
    }, [query]);
    return (
        <div>
            <div className="float-right flex flex-wrap justify-between gap-4 whitespace-nowrap py-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        className="flex items-center rounded-md border border-slate-300 bg-slate-200 text-base font-medium"
                        placeholder="Search..."
                        defaultValue={keyword}
                        id="search"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={users?.items ?? []}
                isLoading={isLoading}
                total={users?.totalItems ?? 0}
                lastPage={1}
                currentPage={users?.currentPage ?? 0}
                nextPage={0}
                previousPage={0}
            />
        </div>
    );
};
