import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ClientState {
  code: number;
  name: string;
  document: string;
  email: string;
}

const initialState: ClientState = {
  code: 0,
  name: '',
  document: '',
  email: '',
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateCode: (state, action: PayloadAction<number>) => {
      state.code = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDocument: (state, action: PayloadAction<string>) => {
      state.document = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetForm: (state) => {
      return state = initialState;
    },
  },
});

export const { updateCode, updateName, updateDocument, updateEmail, resetForm } = clientSlice.actions;

export default clientSlice.reducer;
