import { firestore } from "@services/firebase";
import { RootState } from "@app/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Book type definition
export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  ownerId?: string;
};

type BookState = {
  books: Book[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
};

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunks for CRUD
export const fetchBooks = createAsyncThunk<Book[], void, { state: RootState }>(
  "books/fetchBooks",
  async (_, { getState }) => {
    const state = getState();
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes cache

    // If we have data and it's fresh, don't fetch
    if (
      state.books.books.length > 0 &&
      state.books.lastFetched &&
      now - state.books.lastFetched < fiveMinutes
    ) {
      console.log("Using cached book data");
      return state.books.books;
    }

    console.log("Fetching books from Firebase...");
    const booksCol = collection(firestore, "books");
    const booksSnap = await getDocs(booksCol);
    const books = booksSnap.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Book)
    );
    console.log(`Fetched ${books.length} books from Firebase`);
    return books;
  }
);

export const addBook = createAsyncThunk<Book, Book>(
  "books/addBook",
  async (book) => {
    const bookId = uuidv4();
    // Remove undefined fields
    const cleanedBook = Object.fromEntries(
      Object.entries({ ...book, id: bookId }).filter(
        ([_, v]) => v !== undefined
      )
    );
    await setDoc(doc(firestore, "books", bookId), cleanedBook);
    console.log("Added book:", bookId);
    return { ...book, id: bookId };
  }
);

export const editBook = createAsyncThunk<Book, Book>(
  "books/editBook",
  async (book) => {
    if (!book.id) throw new Error("Book id is required for editing");
    const docRef = doc(firestore, "books", book.id);
    await updateDoc(docRef, {
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
    });
    console.log("Updated book:", book.id);
    return book;
  }
);

export const deleteBook = createAsyncThunk<string, string>(
  "books/deleteBook",
  async (id) => {
    await deleteDoc(doc(firestore, "books", id));
    console.log("Deleted book:", id);
    return id;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Add a manual cache invalidation action
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.loading = false;
        state.lastFetched = Date.now(); // Update cache timestamp
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })
      .addCase(editBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const idx = state.books.findIndex((b) => b.id === action.payload.id);
        if (idx > -1) state.books[idx] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((b) => b.id !== action.payload);
      });
  },
});

export const { invalidateCache } = bookSlice.actions;
export default bookSlice.reducer;
export const selectBooks = (state: RootState) => state.books.books;
