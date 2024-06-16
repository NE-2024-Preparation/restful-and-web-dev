import React from 'react';
import { Outlet } from 'react-router-dom';

const MemberPageLayout:React.FC = () => {
    return (
        <Outlet />
    );
};

export default MemberPageLayout;