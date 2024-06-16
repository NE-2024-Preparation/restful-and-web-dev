import { useSelector } from 'react-redux';
import { RouteObject } from 'react-router-dom';
import { RootState } from '~/core/types/redux';
import { checkRoles } from '~/core/utils/check-role';
import { DashboardPage } from '~/pages/dashboard';
import { UsersPage } from '~/pages/dashboard/users';

export const useDashboardRoutes = (): { dashboardRoutes: RouteObject[] } => {
    const userData = useSelector((state: RootState) => state.user.userData);

    const routes: RouteObject[] = [
        {
            index: true,
            element: <DashboardPage />,
        },
    ];

    if (checkRoles(['admin'], userData)) {
        routes.push({
            path: 'users',
            index: true,
            element: <UsersPage />,
        });
    }

    return { dashboardRoutes: routes };
};
