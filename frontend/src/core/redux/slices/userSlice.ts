import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: {
            id: '',
        },
    },
    reducers: {
        adduserRedux: (state, { payload }) => {
            state.userData = { ...payload };
        },
        removeUserRedux: state => {
            state.userData = {
                id: '',
            };
        },
        updateUserRedux: (state, { payload }) => {
            state.userData = { ...payload };
        },
    },
});

export const { adduserRedux, removeUserRedux, updateUserRedux } =
    userSlice.actions;

export default userSlice.reducer;
