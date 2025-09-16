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

function App() {
  useAnalytics();
  useAuthStateSubscription();

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppRouter />
        </ThemeProvider>
      </LocalizationProvider>
    </PersistGate>
  );
}

export default App;
