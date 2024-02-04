import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {Task} from "../types/Task";
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";

export const deleteTaskById = createAsyncThunk<
    {},
    string | undefined,
    ThunkConfig<string>
>('taskSlice/deleteTaskById', async (id, thunkApi) => {
    const { extra, rejectWithValue,dispatch,getState } = thunkApi;


    if (!id) {
        throw new Error('');
    }
    try {
        console.log(id,"deleteTaskById")
        const response = await extra.api.delete<Task[]>(
            `/tasks/${id}`
        );
        if (!response.data) {
            throw new Error('Failed to delete');
        }
        if(response.statusText==='OK') dispatch(fetchTaskByUserId())

        return response.data

    } catch (e) {
        return rejectWithValue('error');
    }
});