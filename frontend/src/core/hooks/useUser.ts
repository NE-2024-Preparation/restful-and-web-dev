import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '~/core/utils';
import { adduserRedux } from '../redux/slices/userSlice';
import { useLogout } from './useLogout';
import { get_profile } from '~/api/auth';
import { RootState } from '../types/redux';

export const CheckUser = () => {
    const tokens = storage.getTokens();
    const dispatch = useDispatch();
    const { logout } = useLogout();
    const { userData } = useSelector((state: RootState) => state.user);

    const fetchUser = async () => {
        if (tokens) {
            try {
                const data = await get_profile();
                const { user } = data.payload;
                dispatch(adduserRedux(user));
                // storage.setToken(access_token);
            } catch (error) {
                logout();
            }
        }

        if (!tokens && userData.id) {
            logout();
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
};
