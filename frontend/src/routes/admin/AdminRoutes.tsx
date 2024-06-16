import { RouteObject } from 'react-router-dom';
import DashboardPage from '~/pages/admin/dashboard/DashboardPage';
import { AdminUsersPage } from '~/pages/admin/users/AdminUsersPage';

export const AdminRoutes:RouteObject[] = [
    {
        path: '',
        index:true,
        element: <DashboardPage />,
    },
    {
        path: 'users',
        index:true,
        element: <AdminUsersPage />,
    }
];