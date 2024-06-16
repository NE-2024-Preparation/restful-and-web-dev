import { RouteObject } from 'react-router-dom';
import DashboardPage from '~/pages/dashboard/DashboardPage';
import { UsersPage } from '~/pages/dashboard/users/UsersPage';

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
