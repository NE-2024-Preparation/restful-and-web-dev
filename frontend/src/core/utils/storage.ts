import { TokensType } from '../types/tokens';

export const storage = {
    getTokens: (): TokensType | null =>
        JSON.parse(window.localStorage.getItem('tokens') as string),
    setTokens: (tokens: TokensType) =>
        window.localStorage.setItem('tokens', JSON.stringify(tokens)),
    removeTokens: () => window.localStorage.removeItem('tokens'),
};
