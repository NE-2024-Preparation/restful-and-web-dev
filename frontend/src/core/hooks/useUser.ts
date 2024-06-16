import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduserRedux } from '../redux/slices/userSlice';
import { useLogout } from './useLogout';
import { get_profile } from '~/api/auth';
import { RootState } from '../types/redux';

export const CheckAuth = () => {
    const dispatch = useDispatch();
    const { logout } = useLogout();
    const { userData } = useSelector((state: RootState) => state.user);
    const { tokensData } = useSelector((state: RootState) => state.tokens);

    const fetchUser = async () => {
        if (tokensData.accessToken) {
            try {
                const data = await get_profile();
                const { user } = data.payload;
                dispatch(adduserRedux(user));
            } catch (error) {
                logout();
            }
        }

        if (!tokensData.accessToken && userData.id) {
            logout();
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
};
