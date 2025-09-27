import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "@services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
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
  ownerId?: string;
}

type TVShowsState = {
  tvShows: TVShow[];
  loading: boolean;
  error: string | null;
};

const initialState: TVShowsState = {
  tvShows: [],
  loading: false,
  error: null,
};

// ASYNC THUNKS
export const fetchTVShows = createAsyncThunk<TVShow[]>(
  "tvShows/fetchTVShows",
  async () => {
    const querySnapshot = await getDocs(collection(firestore, "tvshows"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as TVShow)
    );
  }
);

export const addTVShow = createAsyncThunk<TVShow, TVShow>(
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

export const editTVShow = createAsyncThunk<TVShow, TVShow>(
  "tvShows/updateShow",
  async (tvshow) => {
    const docRef = doc(firestore, "tvshows", tvshow.id);
    await updateDoc(docRef, {
      title: tvshow.title,
    });
    return tvshow;
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

export const deleteTVShow = createAsyncThunk(
  "tvShows/deleteTVShow",
  async (id: string) => {
    const showDoc = doc(firestore, "tvshows", id);
    await deleteDoc(showDoc);
    return id;
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTVShows.fulfilled,
        (state, action: PayloadAction<TVShow[]>) => {
          state.tvShows = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(addTVShow.fulfilled, (state, action: PayloadAction<TVShow>) => {
        state.tvShows.push(action.payload);
      })
      .addCase(editTVShow.fulfilled, (state, action: PayloadAction<TVShow>) => {
        const idx = state.tvShows.findIndex(
          (tv) => tv.id === action.payload.id
        );
        if (idx > -1) state.tvShows[idx] = action.payload;
      })
      .addCase(
        updateTVShowSeasons.fulfilled,
        (state, action: PayloadAction<{ id: string; seasons: Season[] }>) => {
          const idx = state.tvShows.findIndex(
            (tv) => tv.id === action.payload.id
          );
          if (idx !== -1) state.tvShows[idx].seasons = action.payload.seasons;
        }
      )
      .addCase(
        deleteTVShow.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tvShows = state.tvShows.filter(
            (tv) => tv.id !== action.payload
          );
        }
      );
  },
});

export default tvShowsSlice.reducer;
export const selectTVShows = (state: RootState) => state.tvShows.tvShows;
