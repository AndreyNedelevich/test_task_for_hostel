import { StateSchema } from '@/app/providers/StoreProvider';

export const getShowModal = (state: StateSchema) => state.modal?.showModal;
