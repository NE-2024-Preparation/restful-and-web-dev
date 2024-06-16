import axios from 'axios';
import { config } from '~/config';
import { storage } from '~/core/utils';

export const PRIVATE_API = axios.create({
    baseURL: `${config.BASE_URI}`,
    headers: {
        Authorization: `Bearer ${storage.getTokens()?.accessToken}`,
    },
});
