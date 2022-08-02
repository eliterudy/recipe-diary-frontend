import {createSlice} from '@reduxjs/toolkit';

export interface initialStateUser {
  isServerDown: boolean;
}

const initialState: initialStateUser = {
  isServerDown: false,
};
export const userSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    updateServerDownModal: (state, action) => {
      state.isServerDown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateServerDownModal} = userSlice.actions;
export default userSlice.reducer;
