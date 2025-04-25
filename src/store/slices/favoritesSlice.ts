import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface FavoritesState {
  favorites: FavoriteMovie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      if (!state.favorites.find((m) => m.id === action.payload.id))
        state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
