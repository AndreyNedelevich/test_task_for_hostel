import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserWorkersData = (state: StateSchema) => state.user.workers;
