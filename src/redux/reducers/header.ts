'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface HeaderState {
  isMobileMenuOpen: boolean;
  openedMenu: string | null;
}

const initialState: HeaderState = {
  isMobileMenuOpen: false,
  openedMenu: null
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setOpenedMenu(state, action) {
      state.openedMenu = action.payload;
    },
    resetHeaderState() {
      return initialState;
    }
  }
});

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  setOpenedMenu,
  resetHeaderState
} = headerSlice.actions;

export default headerSlice.reducer;