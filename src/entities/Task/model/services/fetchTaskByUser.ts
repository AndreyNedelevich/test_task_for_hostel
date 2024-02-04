import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {Task} from "../types/Task";
import {getTaskSearch, getTaskSort} from "@/entities/Task/model/selectors/taskByUser";
import {taskSortField} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";
import {getUserAuthData} from "@/entities/User";

export const fetchTaskByUserId = createAsyncThunk<
    Task[],
    string | undefined,
    ThunkConfig<string>
>('taskSlice/fetchArticleByUserId', async (id, thunkApi) => {
    const { extra, rejectWithValue,getState } = thunkApi;
    const sort = getTaskSort(getState());
    const search = getTaskSearch(getState());
    const currentUser = getUserAuthData(getState());

    if (!currentUser) {
        throw new Error('login to your account');
    }


    try {
        const response = await extra.api.get<Task[]>(
            `/tasks`,{params:{
                    userId: id ? id : undefined,
                    managerId: id ? undefined : currentUser?.id,
                    completed: sort === taskSortField.ALL ? undefined : sort,
                    q:search
                }}
        );

        if (!response.data) {
            throw new Error('Something wrong');
        }


        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
