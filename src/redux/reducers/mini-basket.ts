import { createSlice } from '@reduxjs/toolkit';

export interface MiniBasketState {
  open: boolean;
  highlightedItem: number | null;
}

const initialState: MiniBasketState = {
  open: false,
  highlightedItem: null
};

const miniBasketSlice = createSlice({
  name: 'mini-basket',
  initialState,
  reducers: {
    openMiniBasket: (state) => {
      state.open = true;
    },
    closeMiniBasket: (state) => {
      state.open = false;
    },
    toggleMiniBasket: (state) => {
      state.open = !state.open;
    },
    setHighlightedItem: (state, action: { payload: number | null }) => {
      state.highlightedItem = action.payload;
    }
  }
});

export const {
  openMiniBasket,
  closeMiniBasket,
  toggleMiniBasket,
  setHighlightedItem
} = miniBasketSlice.actions;

export default miniBasketSlice.reducer;
