import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreState, Language } from "./types/CoreState";

const initialState: CoreState = {
  language: Language.TH,
};

// Reducer
export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

// Action
export const { updateLanguage } = coreSlice.actions;

// Selector
export const selectLanguage = (state: RootState) => state.core.language;

export default coreSlice.reducer;
