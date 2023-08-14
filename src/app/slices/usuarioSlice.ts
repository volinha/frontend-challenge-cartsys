import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  name: string,
  password: string
}

const initialState: UserState = {
  name: '',
  password: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
})

export const { updateName, updatePassword } = userSlice.actions

export default userSlice.reducer