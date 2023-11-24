import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FeedSliceState {
  selectedTag: string | null;
}

const initialState: FeedSliceState = {
  selectedTag: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    selectTag(state, action: PayloadAction<string | null>) {
      state.selectedTag = action.payload;
    },
  },
});
export const feedActions = feedSlice.actions;
export default feedSlice;
