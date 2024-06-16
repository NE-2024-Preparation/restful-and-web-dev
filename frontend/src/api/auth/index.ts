import { ResponseType } from '~/core/types/response';
import { PRIVATE_API } from '../axios';
import { AxiosErrorHandler, CustomError } from '~/core/libs';
import {
    AuthLoginRequestPayload,
    AuthLoginResponsePayload,
    AuthRegisterRequestPayload,
    AuthRegisterResponsePayload,
} from '~/core/types/auth';
import { ProfileType } from '~/core/types/profile';

export const register_user = async (
    payload: AuthRegisterRequestPayload
): Promise<ResponseType<AuthRegisterResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post('/auth/register', payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const login_user = async (
    payload: AuthLoginRequestPayload
): Promise<ResponseType<AuthLoginResponsePayload>> => {
    try {
        console.log(payload);
        const request = await PRIVATE_API.post('/auth/login', payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_profile = async (): Promise<ResponseType<ProfileType>> => {
    try {
        const request = await PRIVATE_API.get('/profile');
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
