import React from 'react';
import { Outlet } from 'react-router-dom';
import { CheckUser } from '~/core/hooks';

const AppLayout: React.FC = () => {
    CheckUser();

    return <Outlet />;
};

export default AppLayout;
