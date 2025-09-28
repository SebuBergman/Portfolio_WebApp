import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@services/firebase";
import { RootState } from "@app/store";

export interface Movie {
  id: string;
  title: string;
  imageSrc: string;
  releaseDate: string;
  isExpanded: boolean;
  ownerId?: string;
}

type MoviesState = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null; // Add timestamp for caching
};

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Thunks
export const fetchMovies = createAsyncThunk<
  Movie[],
  void,
  { state: RootState }
>("movies/fetchMovies", async (_, { getState }) => {
  const state = getState();
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes cache

  // If we have data and it's fresh, don't fetch
  if (
    state.movies.movies.length > 0 &&
    state.movies.lastFetched &&
    now - state.movies.lastFetched < fiveMinutes
  ) {
    console.log("Using cached movie data");
    return state.movies.movies;
  }

  console.log("Fetching movies from Firebase...");
  const snapshot = await getDocs(collection(firestore, "movies"));
  const movies: Movie[] = [];
  snapshot.forEach((doc) => {
    movies.push(doc.data() as Movie);
  });
  // Sort alphabetically
  movies.sort((a, b) => a.title.localeCompare(b.title));
  console.log(`Fetched ${movies.length} movies from Firebase`);
  return movies;
});

// Fixed addMovie to not refetch after adding
export const addMovie = createAsyncThunk<Movie, Movie>(
  "movies/addMovie",
  async (movie) => {
    await setDoc(doc(firestore, "movies", movie.id), movie);
    console.log("Added movie:", movie.id);
    return movie;
  }
);

// Allow partial updates for updateMovie
export const editMovie = createAsyncThunk<Movie, Movie>(
  "movies/updateMovie",
  async (movie) => {
    const docRef = doc(firestore, "movies", movie.id);
    await updateDoc(docRef, {
      title: movie.title,
    });
    console.log("Updated movie:", movie.id);
    return movie;
  }
);

export const deleteMovie = createAsyncThunk<string, string>(
  "movies/deleteMovie",
  async (id) => {
    await deleteDoc(doc(firestore, "movies", id));
    console.log("Deleted movie:", id);
    return id;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Add a manual cache invalidation action
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movies = action.payload;
          state.loading = false;
          state.lastFetched = Date.now(); // Update cache timestamp
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        // Add to local state and sort alphabetically
        state.movies.push(action.payload);
        state.movies.sort((a, b) => a.title.localeCompare(b.title));
      })
      .addCase(editMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        const idx = state.movies.findIndex((v) => v.id === action.payload.id);
        if (idx > -1) {
          state.movies[idx] = action.payload;
          // Re-sort after edit
          state.movies.sort((a, b) => a.title.localeCompare(b.title));
        }
      })
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload
          );
        }
      );
  },
});

export const { invalidateCache } = moviesSlice.actions;
export default moviesSlice.reducer;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
