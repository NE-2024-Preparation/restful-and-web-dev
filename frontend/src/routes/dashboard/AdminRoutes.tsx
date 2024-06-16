import { RouteObject } from 'react-router-dom';
import { DashboardPage } from '~/pages/dashboard';
import { UsersPage } from '~/pages/dashboard/users';

export const AdminRoutes: RouteObject[] = [
    {
        path: '',
        index: true,
        element: <DashboardPage />,
    },
    {
        path: 'users',
        index: true,
        element: <UsersPage />,
    },
];
