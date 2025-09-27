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
};

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

// Allow partial updates for updateMovie
export const editMovie = createAsyncThunk<Movie, Movie>(
  "movies/updateMovie",
  async (movie) => {
    const docRef = doc(firestore, "movies", movie.id);
    await updateDoc(docRef, {
      title: movie.title,
    });
    return movie;
  }
);

export const deleteMovie = createAsyncThunk<string, string>(
  "movies/deleteMovie",
  async (id) => {
    await deleteDoc(doc(firestore, "movies", id));
    return id;
  }
);

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
      })
      .addCase(editMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        const idx = state.movies.findIndex((v) => v.id === action.payload.id);
        if (idx > -1) state.movies[idx] = action.payload;
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

export default moviesSlice.reducer;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
