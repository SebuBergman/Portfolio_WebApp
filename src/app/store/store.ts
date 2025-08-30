import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "@features/auth/store/authSlice";
import moviesReducer from "@movies/store/movieSlice";
import tvShowsReducer from "@tvShows/store/tvShowSlice";
import booksReducer from "@books/store/bookSlice";
import vinylReducer from "@vinyls/store/vinylSlice";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  books: booksReducer,
  vinyls: vinylReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movies", "tvShows", "books", "vinyls"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Optionally, for TypeScript support:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
