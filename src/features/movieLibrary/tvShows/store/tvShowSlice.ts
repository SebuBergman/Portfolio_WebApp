import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "@services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { RootState } from "@app/store";

export interface Season {
  id: string;
  seasonNumber: number;
  owned: boolean;
}
export interface TVShow {
  id: string;
  title: string;
  seasons: Season[];
}

export interface TVShowsState {
  tvShows: TVShow[];
  loading: boolean;
  error: string | null;
}

const initialState: TVShowsState = {
  tvShows: [],
  loading: false,
  error: null,
};

// ASYNC THUNKS
export const fetchTVShows = createAsyncThunk(
  "tvShows/fetchTVShows",
  async () => {
    const querySnapshot = await getDocs(collection(firestore, "tvshows"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as TVShow)
    );
  }
);

export const addTVShow = createAsyncThunk(
  "tvShows/addTVShow",
  async (tvShow: TVShow) => {
    const seasonsWithIds = tvShow.seasons.map((s) => ({
      ...s,
      id: s.id || uuidv4(),
    }));
    const showId = tvShow.id || uuidv4();
    await setDoc(doc(collection(firestore, "tvshows"), showId), {
      ...tvShow,
      id: showId,
      seasons: seasonsWithIds,
    });
    return { ...tvShow, id: showId, seasons: seasonsWithIds };
  }
);

export const updateTVShowSeasons = createAsyncThunk(
  "tvShows/updateTVShowSeasons",
  async ({ id, seasons }: { id: string; seasons: Season[] }) => {
    const showDoc = doc(firestore, "tvshows", id);
    await updateDoc(showDoc, { seasons });
    return { id, seasons };
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTVShows.fulfilled,
        (state, action: PayloadAction<TVShow[]>) => {
          state.loading = false;
          state.tvShows = action.payload;
        }
      )
      .addCase(fetchTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      // add
      .addCase(addTVShow.fulfilled, (state, action: PayloadAction<TVShow>) => {
        state.tvShows.push(action.payload);
      })
      // update
      .addCase(
        updateTVShowSeasons.fulfilled,
        (state, action: PayloadAction<{ id: string; seasons: Season[] }>) => {
          const idx = state.tvShows.findIndex(
            (tv) => tv.id === action.payload.id
          );
          if (idx !== -1) state.tvShows[idx].seasons = action.payload.seasons;
        }
      );
  },
});

export const selectTVShows = (state: RootState) => state.tvShows.tvShows;
export default tvShowsSlice.reducer;
