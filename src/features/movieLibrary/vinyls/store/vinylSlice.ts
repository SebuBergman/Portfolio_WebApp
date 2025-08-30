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

export type Vinyl = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  year?: string;
  ownerId?: string;
};

// Async thunks
export const fetchVinyls = createAsyncThunk<Vinyl[]>(
  "vinyls/fetchVinyls",
  async () => {
    const col = collection(firestore, "vinyls");
    const snap = await getDocs(col);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Vinyl));
  }
);

export const addVinyl = createAsyncThunk<Vinyl, Vinyl>(
  "vinyls/addVinyl",
  async (vinyl) => {
    const id = uuidv4();
    const cleaned = Object.fromEntries(
      Object.entries({ ...vinyl, id }).filter(([_, v]) => v !== undefined)
    );
    await setDoc(doc(firestore, "vinyls", id), cleaned);
    return { ...vinyl, id };
  }
);

export const editVinyl = createAsyncThunk<Vinyl, Vinyl>(
  "vinyls/editVinyl",
  async (vinyl) => {
    if (!vinyl.id) throw new Error("Vinyl id is required");
    const docRef = doc(firestore, "vinyls", vinyl.id);
    await updateDoc(docRef, {
      title: vinyl.title,
      artist: vinyl.artist,
      coverUrl: vinyl.coverUrl,
      year: vinyl.year,
    });
    return vinyl;
  }
);

export const deleteVinyl = createAsyncThunk<string, string>(
  "vinyls/deleteVinyl",
  async (id) => {
    await deleteDoc(doc(firestore, "vinyls", id));
    return id;
  }
);

type VinylState = { vinyls: Vinyl[]; loading: boolean; error: string | null };

const initialState: VinylState = { vinyls: [], loading: false, error: null };

const vinylSlice = createSlice({
  name: "vinyls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVinyls.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchVinyls.fulfilled,
        (state, action: PayloadAction<Vinyl[]>) => {
          state.vinyls = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchVinyls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addVinyl.fulfilled, (state, action: PayloadAction<Vinyl>) => {
        state.vinyls.push(action.payload);
      })
      .addCase(editVinyl.fulfilled, (state, action: PayloadAction<Vinyl>) => {
        const idx = state.vinyls.findIndex((v) => v.id === action.payload.id);
        if (idx > -1) state.vinyls[idx] = action.payload;
      })
      .addCase(
        deleteVinyl.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.vinyls = state.vinyls.filter((v) => v.id !== action.payload);
        }
      );
  },
});

export default vinylSlice.reducer;
export const selectVinyls = (state: RootState) => state.vinyls.vinyls;
