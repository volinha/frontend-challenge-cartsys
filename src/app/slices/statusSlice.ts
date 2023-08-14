import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface StatusState {
    isActive: boolean;
    message: string;
    type: string;
}

const initialState: StatusState = {
    isActive: false,
    message: '',
    type: '',
}

export const statusSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<StatusState>) => {
            state.isActive = action.payload.isActive;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearStatus: (state) => {
            state.isActive = false;
            state.message = '';
            state.type = '';
        }
    }
})

export const { setStatus, clearStatus } = statusSlice.actions;

export default statusSlice.reducer;