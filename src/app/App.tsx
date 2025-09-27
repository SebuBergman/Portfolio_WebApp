import { GlobalStyles } from "@app/config/styles/Global";

import { HeroUIProvider } from "@heroui/react";
import { theme } from "@config/styles";
import { useAuthStateSubscription } from "@services/firebase";

import { AppRouter } from "./config/routes";
import "./app.scss";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Loader from "@features/ui/Loader";
import { persistor } from "./store/index";
import { ThemeProvider } from "@mui/material";
import { useAnalytics } from "./hooks/useAnalytics";

// datePickerTheme extends the main theme:
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

function App() {
  useAnalytics();
  useAuthStateSubscription();

  const datePickerTheme = createTheme({
    ...theme, // Spread the main theme first
    components: {
      ...theme.components, // Keep existing components
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: "black",
            borderRadius: "2px",
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiYearCalendar: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiPickersInputBase: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    } as any,
  });

  return (
    <>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={datePickerTheme}>
            <GlobalStyles />
            <AppRouter />
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            padding: "16px",
            fontSize: "16px",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;
