import { createSlice } from '@reduxjs/toolkit';
import { TokensType } from '~/core/types/tokens';

const tokensSlice = createSlice({
    name: 'tokensData',
    initialState: {
        tokensData: {},
    },
    reducers: {
        addTokensRedux: (state, { payload }: { payload: TokensType }) => {
            state.tokensData = { ...payload };
        },
        removeTokensRedux: state => {
            state.tokensData = {};
        },
        updateTokensRedux: (state, { payload }: { payload: TokensType }) => {
            state.tokensData = { ...payload };
        },
    },
});

export const { addTokensRedux, removeTokensRedux, updateTokensRedux } =
    tokensSlice.actions;

export default tokensSlice.reducer;
