import { useRoutes } from 'react-router-dom';
import AppLayout from '~/components/layouts/app/AppLayout';
import AuthPageLayout from '~/components/layouts/auth/AuthPageLayout';
import { AuthRouteProtector } from '~/core/protector/auth/AuthProtector';
import NotFoundPage from '~/pages/notfound/NotFoundPage';
import { AdminRoutes } from './dashboard/AdminRoutes';
import { AuthRoutes } from './auth/AuthRoutes';
import HomePage from '~/pages/home/HomePage';
import DashboardPageLayout from '~/components/layouts/dashboard/DashboardPageLayout';
import { DashboardProtector } from '~/core/protector/dashboard/DashboardProtector';

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'auth',
                    element: (
                        <AuthRouteProtector element={<AuthPageLayout />} />
                    ),
                    children: AuthRoutes,
                },
                {
                    path: 'dashboard',
                    element: (
                        <DashboardProtector element={<DashboardPageLayout />} />
                    ),
                    children: AdminRoutes,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
};
