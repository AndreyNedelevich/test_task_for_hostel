import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {Task} from "../types/Task";
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";

interface EditTask {
    id: string,
    task: Task
}


export const EditTaskById = createAsyncThunk<
    Task,
    Task,
    ThunkConfig<string>
>('taskSlice/EditTaskById', async (task, thunkApi) => {
    const { extra, rejectWithValue,dispatch,getState } = thunkApi;


    if (!task.id) {
        throw new Error('');
    }
    try {
        const response = await extra.api.patch<Task>(
            `/tasks/${task.id}`,
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
            dispatch(fetchTaskByUserId(task.userId))
        }

        return response.data

    } catch (e) {
        return rejectWithValue('error');
    }
});