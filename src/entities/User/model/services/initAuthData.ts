import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';
import {
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';


export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {

        const { extra, rejectWithValue } = thunkApi;
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('');
        }

        try {
            const response = await extra.api.get<User>(
                `/users/${userId}`
            );

            return response.data;
        } catch (e) {
            return rejectWithValue('');
        }
    },
);
