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
    const countdownCol = collection(firestore, "countdowns");
    const countdownSnap = await getDocs(countdownCol);
    const countdowns: Countdown[] = [];
    countdownSnap.forEach((docSnap) => {
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

export const addCountdown = createAsyncThunk<Countdown, Countdown>(
  "countdowns/addCountdown",
  async (countdown) => {
    const countdownId = countdown.id;
    await setDoc(doc(firestore, "countdowns", countdownId), countdown);
    return { ...countdown, id: countdownId };
  }
);

export const editCountdown = createAsyncThunk<Countdown, Countdown>(
  "countdowns/updateCountdown",
  async (countdown) => {
    if (!countdown.id) throw new Error("Countdown id is required");
    const docRef = doc(firestore, "countdowns", countdown.id);
    await updateDoc(docRef, {
      eventName: countdown.eventName,
      eventDate: countdown.eventDate,
      daysRemaining: countdown.daysRemaining,
    });
    return countdown;
  }
);

export const deleteCountdown = createAsyncThunk<string, string>(
  "countdowns/deleteCountdown",
  async (id) => {
    await deleteDoc(doc(firestore, "countdowns", id));
    return id;
  }
);

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
      })
      .addCase(
        addCountdown.fulfilled,
        (state, action: PayloadAction<Countdown>) => {
          state.countdowns.push(action.payload);
        }
      )
      .addCase(
        editCountdown.fulfilled,
        (state, action: PayloadAction<Countdown>) => {
          const idx = state.countdowns.findIndex(
            (c) => c.id === action.payload.id
          );
          if (idx > -1) state.countdowns[idx] = action.payload;
        }
      )
      .addCase(
        deleteCountdown.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.countdowns = state.countdowns.filter(
            (c) => c.id !== action.payload
          );
        }
      );
  },
});

export default countdownSlice.reducer;
export const selectCountdowns = (state: RootState) =>
  state.countdowns.countdowns;
export const selectCountdownsLoading = (state: RootState) =>
  state.countdowns.loading;
