import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {Task} from "../types/Task";
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";
import { getUserIdTasks } from '../selectors/taskByUser';

interface EditTaskPayload {
    task: Task;
}


export const EditTaskById = createAsyncThunk<
    Task,
    EditTaskPayload,
    ThunkConfig<string>
>('taskSlice/EditTaskById', async (payload, thunkApi) => {
    const { extra, rejectWithValue,dispatch,getState } = thunkApi;
    const { task } = payload;
    const userIdFromUrl = getUserIdTasks(getState());

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
            dispatch(fetchTaskByUserId(userIdFromUrl))
        }

        return response.data

    } catch (e) {
        return rejectWithValue('error');
    }
});