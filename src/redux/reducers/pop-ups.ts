import { createSlice } from '@reduxjs/toolkit';

export interface PopUpState {
  openMiniBasket: boolean;
  openAccountPopUp: boolean;
  highlightedItem: number | null;
}

const initialState: PopUpState = {
  openMiniBasket: false,
  openAccountPopUp: false,
  highlightedItem: null
};

const popUpsSlice = createSlice({
  name: 'mini-basket',
  initialState,
  reducers: {
    openMiniBasket: (state) => {
      state.openMiniBasket = true;
      state.openAccountPopUp = false;
    },
    closeMiniBasket: (state) => {
      state.openMiniBasket = false;
    },
    toggleMiniBasket: (state) => {
      if (state.openMiniBasket === false) {
        if (state.openAccountPopUp === true) {
          state.openAccountPopUp = false;
        }
      }
      state.openMiniBasket = !state.openMiniBasket;
    },
    openAccountPopUp: (state) => {
      state.openAccountPopUp = true;
      state.openMiniBasket = false;
    },
    closeAccountPopUp: (state) => {
      state.openAccountPopUp = false;
    },
    toggleAccountPopUp: (state) => {
      if (state.openAccountPopUp === false) {
        if (state.openMiniBasket === true) {
          state.openMiniBasket = false;
        }
      }
      state.openMiniBasket = !state.openMiniBasket;
    },
    closeBothPopUps: (state) => {
      state.openMiniBasket = false;
      state.openAccountPopUp = false;
    },
    sethighlightedItem: (state, action: { payload: number | null }) => {
      state.highlightedItem = action.payload;
    }
  }
});

export const {
  openMiniBasket,
  openAccountPopUp,
  closeMiniBasket,
  closeAccountPopUp,
  toggleMiniBasket,
  toggleAccountPopUp,
  closeBothPopUps,
  sethighlightedItem
} = popUpsSlice.actions;

export default popUpsSlice.reducer;
