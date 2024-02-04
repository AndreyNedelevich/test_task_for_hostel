import { AxiosInstance } from 'axios';
import { LoginSchema } from '@/features/AuthByUsername';
import { UserSchema } from '@/entities/User';
import { ProfileSchema } from '@/features/editableProfileCard';
import {TaskSchema} from "@/entities/Task/model/types/TaskSchema";
import {ModalSchema} from "@/features/showModal/model/types/modalSchema";

export interface StateSchema {
    user: UserSchema;
    loginForm: LoginSchema;
    profile: ProfileSchema;
    task: TaskSchema
    modal:ModalSchema
}

 export type StateSchemaKey = keyof StateSchema;



export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
