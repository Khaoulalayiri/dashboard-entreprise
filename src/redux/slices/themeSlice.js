import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true,
  sidebarOpen: true,
  primaryColor: 'purple',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
  },
});

// IMPORTANT: Exporter les actions ET le reducer
export const { 
  toggleDarkMode,
  setDarkMode,
  toggleSidebar, 
  setSidebarOpen, 
  setPrimaryColor,
} = themeSlice.actions;

// Exporter le reducer par défaut
export default themeSlice.reducer;