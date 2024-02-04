import {Task} from "./Task";
import {taskSortField} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";

export interface TaskSchema {
    isLoading: boolean;
    error?: string;
    data?: Task[];
    sort: taskSortField,
    search: string,
}