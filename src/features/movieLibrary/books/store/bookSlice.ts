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
  id?: string;
  title: string;
  author: string;
  coverUrl?: string;
};

// Async thunks for CRUD
export const fetchBooks = createAsyncThunk<Book[]>(
  "books/fetchBooks",
  async () => {
    const booksCol = collection(firestore, "books");
    const booksSnap = await getDocs(booksCol);
    return booksSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Book));
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
    return book;
  }
);

export const deleteBook = createAsyncThunk<string, string>(
  "books/deleteBook",
  async (id) => {
    await deleteDoc(doc(firestore, "books", id));
    return id;
  }
);

type BookState = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        console.log("Book added to state", action.payload);
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

export default bookSlice.reducer;
export const selectBooks = (state: RootState) => state.books.books;
