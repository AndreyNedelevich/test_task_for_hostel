import { StateSchema } from '@/app/providers/StoreProvider';
import {taskSortField} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";

export const gettaskByUserData = (state: StateSchema) =>
    [...(state.task?.data || [])].sort((a, b) => a.order! - b.order!);
export const gettaskByUserIsLoading = (state: StateSchema) =>
    state.task?.isLoading || false;
export const gettaskByUserError = (state: StateSchema) =>
    state.task?.error;

export const getTaskSort = (state: StateSchema) =>
    state.task?.sort ?? taskSortField.ALL;
export const getTaskSearch = (state: StateSchema) =>
    state.task?.search ?? '';