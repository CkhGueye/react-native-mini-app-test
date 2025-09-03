import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "EDIT_PRODUCT" | null;

export interface ModalState {
  visible: boolean;
  modalType: ModalType;
  modalProps: Record<string, any> | null;
}

const initialState: ModalState = {
  visible: false,
  modalType: null,
  modalProps: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        modalType: ModalType;
        modalProps?: Record<string, any>;
      }>
    ) {
      state.visible = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps ?? null;
    },
    closeModal(state) {
      state.visible = false;
      // keep modalType & modalProps until cleared by clearModal()
    },
    clearModal(state) {
      state.visible = false;
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal, clearModal } = modalSlice.actions;
export default modalSlice.reducer;
