import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

export type RandomizerType = "movies" | "shows" | "books" | "vinyls";

interface RandomizerHistory {
  [key: string]: string[]; // key is the type (e.g., "movies"), value is array of IDs
}

interface RandomizerState {
  history: RandomizerHistory;
  currentSelection: {
    type: RandomizerType | null;
    id: string | null;
  };
}

const initialState: RandomizerState = {
  history: {},
  currentSelection: {
    type: null,
    id: null,
  },
};

const randomizerSlice = createSlice({
  name: "randomizer",
  initialState,
  reducers: {
    setRandomSelection: (
      state,
      action: PayloadAction<{ type: RandomizerType; id: string }>
    ) => {
      const { type, id } = action.payload;

      // Initialize history array for this type if it doesn't exist
      if (!state.history[type]) {
        state.history[type] = [];
      }

      // Add to history if not already there
      if (!state.history[type].includes(id)) {
        state.history[type].push(id);
      }

      // Set current selection
      state.currentSelection = { type, id };
    },

    clearHistory: (state, action: PayloadAction<RandomizerType>) => {
      state.history[action.payload] = [];
      if (state.currentSelection.type === action.payload) {
        state.currentSelection = { type: null, id: null };
      }
    },

    clearAllHistory: (state) => {
      state.history = {};
      state.currentSelection = { type: null, id: null };
    },

    removeFromHistory: (
      state,
      action: PayloadAction<{ type: RandomizerType; id: string }>
    ) => {
      const { type, id } = action.payload;
      if (state.history[type]) {
        state.history[type] = state.history[type].filter(
          (historyId) => historyId !== id
        );
      }
    },
  },
});

export const {
  setRandomSelection,
  clearHistory,
  clearAllHistory,
  removeFromHistory,
} = randomizerSlice.actions;

export default randomizerSlice.reducer;

// Selectors
export const selectRandomizerHistory = (
  state: RootState,
  type: RandomizerType
) => state.randomizer.history[type] || [];

export const selectCurrentSelection = (state: RootState) =>
  state.randomizer.currentSelection;

export const selectHistoryCount = (state: RootState, type: RandomizerType) =>
  state.randomizer.history[type]?.length || 0;
