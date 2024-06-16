import { RouteObject } from 'react-router-dom';
import HomePage from '~/pages/home/HomePage';

export const MemberRoutes:RouteObject[] = [
    {
        path: '',
        index:true,
        element: <HomePage />,
    }
];