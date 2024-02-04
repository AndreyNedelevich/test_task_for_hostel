import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import {profileReducer} from "@/features/editableProfileCard/model/slice/profileSlice";
import {loginReducer} from "@/features/AuthByUsername/model/slice/loginSlice";
import {taskReducer} from "@/entities/Task/model/slice/TestSlice";
import {modalReducer} from "@/features/showModal/model/slice/modalSlice";

export function createReduxStore(
    initialState?: StateSchema,

) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        profile: profileReducer,
        task:taskReducer,
        modal:modalReducer
    };


    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
