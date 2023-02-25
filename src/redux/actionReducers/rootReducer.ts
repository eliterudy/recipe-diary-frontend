import {createSlice} from '@reduxjs/toolkit';

export interface initialStateUser {}

const initialState: initialStateUser = {};
export const userSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;
export default userSlice.reducer;
