import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { storage } from '~/core/utils';
import { ProtectorPropsType } from '../types';
import { RootState } from '~/core/types/redux';

export const AuthRouteProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const token = storage.getTokens();

    const { userData } = useSelector((state: RootState) => state.user);

    // if (token && userData.role) return <Navigate to={'/'} />;

    return element;
};
