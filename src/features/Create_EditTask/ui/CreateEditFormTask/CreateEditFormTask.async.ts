import { FC, lazy } from 'react';
import { LoginFormProps } from './CreateEditFormTask';

export const CreateEditFormTaskAsync = lazy<FC<LoginFormProps>>(
    () => import('./CreateEditFormTask'),
);
