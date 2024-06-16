/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTable, TableColumn } from '~/components/elements';
import { useContext, useEffect, useState } from 'react';
import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserType } from '~/core/types';
import { PaginationType } from '~/core/types/pagination';
import {
    ExportContext,
    ExportContextType,
} from '~/core/provider/export/ExportContextProvider';
import { exportUsers } from '~/core/helper';
import { get_all_users } from '~/api/user';

export const AdminUsersPage = () => {
    const location = useLocation();

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const [users, setUsers] = useState<PaginationType<UserType>>();

    const [keyword, setKeyword] = useState('');

    const { setExportData } = useContext<ExportContextType>(ExportContext);

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
            const data: PaginationType<UserType> = await get_all_users(query);
            setUsers(data);
            setExportData(exportUsers(data?.list ?? []));
        } catch (error) {
            console.log(error);
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
                data={users?.list ?? []}
                isLoading={isLoading}
                total={users?.total ?? 0}
                nextPage={users?.nextPage ?? 0}
                lastPage={users?.lastPage ?? 0}
                currentPage={users?.currentPage ?? 0}
                previousPage={users?.previousPage ?? 0}
            />
        </div>
    );
};
