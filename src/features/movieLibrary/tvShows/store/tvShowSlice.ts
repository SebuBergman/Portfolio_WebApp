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
  lastFetched: number | null; // Add timestamp for caching
};

const initialState: TVShowsState = {
  tvShows: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// ASYNC THUNKS
export const fetchTVShows = createAsyncThunk<
  TVShow[],
  void,
  { state: RootState }
>("tvShows/fetchTVShows", async (_, { getState }) => {
  const state = getState();
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes cache

  // If we have data and it's fresh, don't fetch
  if (
    state.tvShows.tvShows.length > 0 &&
    state.tvShows.lastFetched &&
    now - state.tvShows.lastFetched < fiveMinutes
  ) {
    console.log("Using cached TV show data");
    return state.tvShows.tvShows;
  }

  console.log("Fetching TV shows from Firebase...");
  const querySnapshot = await getDocs(collection(firestore, "tvshows"));
  const tvShows = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as TVShow)
  );
  console.log(`Fetched ${tvShows.length} TV shows from Firebase`);
  return tvShows;
});

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
    console.log("Added TV show:", showId);
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
    console.log("Updated TV show:", tvshow.id);
    return tvshow;
  }
);

// CRITICAL: Keep this exactly as it was - this handles the season checkbox updates
export const updateTVShowSeasons = createAsyncThunk(
  "tvShows/updateTVShowSeasons",
  async ({ id, seasons }: { id: string; seasons: Season[] }) => {
    const showDoc = doc(firestore, "tvshows", id);
    await updateDoc(showDoc, { seasons });
    console.log("Updated seasons for TV show:", id);
    return { id, seasons };
  }
);

export const deleteTVShow = createAsyncThunk(
  "tvShows/deleteTVShow",
  async (id: string) => {
    const showDoc = doc(firestore, "tvshows", id);
    await deleteDoc(showDoc);
    console.log("Deleted TV show:", id);
    return id;
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    // Add a manual cache invalidation action
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
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
          state.lastFetched = Date.now(); // Update cache timestamp
        }
      )
      .addCase(fetchTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(addTVShow.fulfilled, (state, action: PayloadAction<TVShow>) => {
        state.tvShows.push(action.payload);
        // Don't invalidate cache - just update local state
      })
      .addCase(editTVShow.fulfilled, (state, action: PayloadAction<TVShow>) => {
        const idx = state.tvShows.findIndex(
          (tv) => tv.id === action.payload.id
        );
        if (idx > -1) state.tvShows[idx] = action.payload;
        // Don't invalidate cache - just update local state
      })
      // CRITICAL: Keep this exactly as it was - handles season updates
      .addCase(
        updateTVShowSeasons.fulfilled,
        (state, action: PayloadAction<{ id: string; seasons: Season[] }>) => {
          const idx = state.tvShows.findIndex(
            (tv) => tv.id === action.payload.id
          );
          if (idx !== -1) state.tvShows[idx].seasons = action.payload.seasons;
          // Don't invalidate cache - season updates are local state changes
        }
      )
      .addCase(
        deleteTVShow.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tvShows = state.tvShows.filter(
            (tv) => tv.id !== action.payload
          );
          // Don't invalidate cache - just update local state
        }
      );
  },
});

export const { invalidateCache } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
export const selectTVShows = (state: RootState) => state.tvShows.tvShows;
