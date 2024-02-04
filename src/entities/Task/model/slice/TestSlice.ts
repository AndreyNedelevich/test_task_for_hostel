import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {Task} from "@/entities/Task/model/types/Task";
import {TaskSchema} from "@/entities/Task/model/types/TaskSchema";
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";
import {taskSortField} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";

const initialState: TaskSchema= {
    isLoading: false,
    error: undefined,
    data: [],
    sort: taskSortField.ALL,
    search: '',
};

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<taskSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskByUserId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchTaskByUserId.fulfilled,
                (state, action: PayloadAction<Task[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchTaskByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: taskActions } = taskSlice;
export const { reducer: taskReducer } = taskSlice;