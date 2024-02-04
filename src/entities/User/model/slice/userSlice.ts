import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { UserSchema, User } from '../types/user';
import {initAuthData} from "@/entities/User";



const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            state.workers=payload.workers;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});


export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
