import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/core/types/redux';

const RoleProvider: React.FC = () => {
    const { userData } = useSelector((state: RootState) => state.user);

    // if (userData.role === EROLE.MEMBER)
    //     return <Navigate to={'/'} />;

    // if (userData.role === EROLE.ADMIN)
    //     return <Navigate to={'/admin'} />;

    return <Navigate to={'/auth'} />;
};

export default RoleProvider;
