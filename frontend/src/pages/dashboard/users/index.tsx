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

    const columns: TableColumn<UserType>[] = [
        {
            title: 'First Name',
            cell: row => row.firstName,
        },
        {
            title: 'Last Name',
            cell: row => row.lastName,
        },
        {
            title: 'Email',
            cell: row => row.email,
        },
        {
            title: 'Username',
            cell: row => row.username,
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

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const data = await get_users(query);
            setUsers(data.payload);
            setExportData(exportUsers(data.payload.items || []));
        } catch (error) {
            toast.error('Error getting users');
        } finally {
            setIsLoading(false);
        }
    };

    const updateQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        if (!searchParams.has('page') && !searchParams.has('limit')) return;
        if (keyword) searchParams.set('search', keyword.toString());
        else searchParams.delete('search');
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    useEffect(() => {
        updateQueryParams();
    }, [keyword]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('page') && searchParams.has('limit'))
            handleGetUsers();
    }, [query]);

    return (
        <div className="h-full w-full">
            <div className="float-right flex flex-wrap justify-between gap-4 whitespace-nowrap py-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        className="w-[10rem] rounded border px-3 py-2 text-xs lg:w-[15rem]"
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
