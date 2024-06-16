import React from 'react';
import { Outlet } from 'react-router-dom';
import { CheckAuth } from '~/core/hooks';

const AppLayout: React.FC = () => {
    CheckAuth();

    return <Outlet />;
};

export default AppLayout;
