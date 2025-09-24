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
import { differenceInDays } from "@app/services/date/differenceInDays";

export interface Countdown {
  id: string;
  eventName: string;
  eventDate: string; // ISO string
  daysRemaining: number;
  description?: string;
  ownerId?: string;
}

interface CountdownState {
  countdowns: Countdown[];
  loading: boolean;
  error: string | null;
}

const initialState: CountdownState = {
  countdowns: [],
  loading: false,
  error: null,
};

export const fetchCountdowns = createAsyncThunk<Countdown[]>(
  "countdowns/fetchCountdowns",
  async () => {
    const snapshot = await getDocs(collection(firestore, "countdowns"));
    const countdowns: Countdown[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Countdown;
      // recalc daysRemaining in case it's outdated in DB
      const daysRemaining = differenceInDays(
        new Date(data.eventDate),
        new Date()
      );
      countdowns.push({ ...data, daysRemaining });
    });
    // Sort by nearest date
    countdowns.sort((a, b) => a.daysRemaining - b.daysRemaining);
    return countdowns;
  }
);

export const addCountdown = createAsyncThunk<void, Countdown>(
  "countdowns/addCountdown",
  async (countdown, { dispatch }) => {
    await setDoc(doc(firestore, "countdowns", countdown.id), countdown);
    dispatch(fetchCountdowns());
  }
);

export const deleteCountdown = createAsyncThunk<void, string>(
  "countdowns/deleteCountdown",
  async (id, { dispatch }) => {
    await deleteDoc(doc(firestore, "countdowns", id));
    dispatch(fetchCountdowns());
  }
);

export const updateCountdown = createAsyncThunk<
  void,
  { id: string; updates: Partial<Countdown> }
>("countdowns/updateCountdown", async ({ id, updates }, { dispatch }) => {
  await updateDoc(doc(firestore, "countdowns", id), updates);
  dispatch(fetchCountdowns());
});

const countdownSlice = createSlice({
  name: "countdowns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountdowns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCountdowns.fulfilled,
        (state, action: PayloadAction<Countdown[]>) => {
          state.countdowns = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCountdowns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch countdowns";
      });
  },
});

export default countdownSlice.reducer;
export const selectCountdowns = (state: RootState) =>
  state.countdowns.countdowns;
export const selectCountdownsLoading = (state: RootState) =>
  state.countdowns.loading;
