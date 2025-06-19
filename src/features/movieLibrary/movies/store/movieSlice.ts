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

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const snapshot = await getDocs(collection(firestore, "movies"));
    const movies: Movie[] = [];
    snapshot.forEach((doc) => {
      movies.push(doc.data() as Movie);
    });
    // Sort alphabetically
    movies.sort((a, b) => a.title.localeCompare(b.title));
    return movies;
  }
);

export const addMovie = createAsyncThunk<void, Movie>(
  "movies/addMovie",
  async (movie, { dispatch }) => {
    await setDoc(doc(firestore, "movies", movie.id), movie);
    dispatch(fetchMovies());
  }
);

export const deleteMovie = createAsyncThunk<void, string>(
  "movies/deleteMovie",
  async (id, { dispatch }) => {
    await deleteDoc(doc(firestore, "movies", id));
    dispatch(fetchMovies());
  }
);

// Allow partial updates for updateMovie
export const updateMovie = createAsyncThunk<
  void,
  { id: string; title: string }
>("movies/updateMovie", async ({ id, title }, { dispatch }) => {
  console.log("Movie edited?:", id, title);
  await updateDoc(doc(firestore, "movies", id), { title });
  dispatch(fetchMovies());
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export default moviesSlice.reducer;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
