import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences, ThemeMode } from '@/types';

const initialState: UserPreferences = {
  theme: { mode: 'dark' },
  language: 'en-US',
  region: 'US',
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
  },
});

export const { setThemeMode, setLanguage, setRegion } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer; 