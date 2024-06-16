import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { storage } from '~/core/utils';
import { ProtectorPropsType } from '../types';
import { RootState } from '~/core/types/redux';

export const AdminRouteProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const tokens = storage.getTokens();

    const { userData } = useSelector((state: RootState) => state.user);

    if (!tokens) return <Navigate to={'/auth'} />;

    // if (userData.role !== EROLE.ADMIN)
    //     return <RoleProvider />;

    return element;
};
