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

type CountdownState = {
  countdowns: Countdown[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null; // Add timestamp for caching
};

const initialState: CountdownState = {
  countdowns: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchCountdowns = createAsyncThunk<
  Countdown[],
  void,
  { state: RootState }
>("countdowns/fetchCountdowns", async (_, { getState }) => {
  const state = getState();
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes cache

  // If we have data and it's fresh, don't fetch
  if (
    state.countdowns.countdowns.length > 0 &&
    state.countdowns.lastFetched &&
    now - state.countdowns.lastFetched < fiveMinutes
  ) {
    //console.log("Using cached countdown data");
    return state.countdowns.countdowns;
  }

  //console.log("Fetching countdowns from Firebase...");
  const countdownCol = collection(firestore, "countdowns");
  const countdownSnap = await getDocs(countdownCol);
  const countdowns: Countdown[] = [];

  countdownSnap.forEach((docSnap) => {
    const data = docSnap.data() as Countdown;
    // Recalc daysRemaining in case it's outdated in DB
    const daysRemaining = differenceInDays(
      new Date(data.eventDate),
      new Date()
    );
    countdowns.push({ ...data, daysRemaining });
  });

  // Sort by nearest date
  countdowns.sort((a, b) => a.daysRemaining - b.daysRemaining);
  //console.log(`Fetched ${countdowns.length} countdowns from Firebase`);
  return countdowns;
});

export const addCountdown = createAsyncThunk<Countdown, Countdown>(
  "countdowns/addCountdown",
  async (countdown) => {
    const countdownId = countdown.id;
    await setDoc(doc(firestore, "countdowns", countdownId), countdown);
    //console.log("Added countdown:", countdownId);
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
    //console.log("Updated countdown:", countdown.id);
    return countdown;
  }
);

export const deleteCountdown = createAsyncThunk<string, string>(
  "countdowns/deleteCountdown",
  async (id) => {
    await deleteDoc(doc(firestore, "countdowns", id));
    //console.log("Deleted countdown:", id);
    return id;
  }
);

const countdownSlice = createSlice({
  name: "countdowns",
  initialState,
  reducers: {
    // Add a manual cache invalidation action
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
    // Add an action to refresh days remaining without Firebase call
    refreshDaysRemaining: (state) => {
      const now = new Date();
      state.countdowns.forEach((countdown) => {
        countdown.daysRemaining = differenceInDays(
          new Date(countdown.eventDate),
          now
        );
      });
      // Re-sort after updating days remaining
      state.countdowns.sort((a, b) => a.daysRemaining - b.daysRemaining);
    },
  },
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
          state.lastFetched = Date.now(); // Update cache timestamp
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
          // Re-sort after adding
          state.countdowns.sort((a, b) => a.daysRemaining - b.daysRemaining);
        }
      )
      .addCase(
        editCountdown.fulfilled,
        (state, action: PayloadAction<Countdown>) => {
          const idx = state.countdowns.findIndex(
            (c) => c.id === action.payload.id
          );
          if (idx > -1) {
            state.countdowns[idx] = action.payload;
            // Re-sort after editing
            state.countdowns.sort((a, b) => a.daysRemaining - b.daysRemaining);
          }
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

export const { invalidateCache, refreshDaysRemaining } = countdownSlice.actions;
export default countdownSlice.reducer;
export const selectCountdowns = (state: RootState) =>
  state.countdowns.countdowns;
export const selectCountdownsLoading = (state: RootState) =>
  state.countdowns.loading;
