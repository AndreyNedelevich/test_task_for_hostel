import { createSlice } from '@reduxjs/toolkit';
import {ModalSchema} from "@/features/showModal/model/types/modalSchema";

const initialState: ModalSchema = {
    showModal: false,
};

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        onShowModal: (state) => {
            state.showModal = true;
        },
        onCloseModal: (state) => {
            state.showModal = false;
        },

    }
});


export const { actions: modalActions } = modalSlice;
export const { reducer: modalReducer } = modalSlice;
