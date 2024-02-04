import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";
import {Task} from "@/entities/Task";

export const createNewTask = createAsyncThunk<
    Task,
    Task,
    ThunkConfig<string>
>('taskSlice/createNewTask', async (task, thunkApi) => {
    const { extra, rejectWithValue,dispatch,getState } = thunkApi;

    try {
        const response = await extra.api.post<Task>(
            `/tasks`,
            JSON.stringify(task),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!response.data) {
            throw new Error('Failed to create new task');
        }
        if(response.data){
            dispatch(fetchTaskByUserId(task?.userId))
        }
        return response.data
    } catch (e) {
        return rejectWithValue('Failed to create new task');
    }
});