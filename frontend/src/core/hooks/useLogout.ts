import { useDispatch } from 'react-redux';
import { storage } from '~/core/utils';
import { removeUserRedux } from '../redux/slices/userSlice';

export const useLogout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        storage.removeTokens();
        dispatch(removeUserRedux());
        window.location.reload();
    };

    return { logout };
};
