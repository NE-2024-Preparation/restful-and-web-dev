import { useRoutes } from 'react-router-dom';
import AdminPageLayout from '~/components/layouts/admin/AdminPageLayout';
import AppLayout from '~/components/layouts/app/AppLayout';
import AuthPageLayout from '~/components/layouts/auth/AuthPageLayout';
import MemberPageLayout from '~/components/layouts/member/MemberPageLayout';
import { AdminRouteProtector } from '~/core/protector/admin/AdminProtector';
import { AuthRouteProtector } from '~/core/protector/auth/AuthProtector';
import { MemberRouteProtector } from '~/core/protector/member/MemberProtector';
import NotFoundPage from '~/pages/notfound/NotFoundPage';
import { AdminRoutes } from './admin/AdminRoutes';
import { AuthRoutes } from './auth/AuthRoutes';
import { MemberRoutes } from './member/MemberRoutes';

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path:'/',
                    element: <MemberRouteProtector element={<MemberPageLayout />} />,
                    children: MemberRoutes

                },
                {
                    path: 'auth',
                    element: <AuthRouteProtector element={<AuthPageLayout />} />,
                    children: AuthRoutes,
                },
                {
                    path: 'admin',
                    element: <AdminRouteProtector element={<AdminPageLayout />} />,
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
