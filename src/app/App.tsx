import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@app/config/styles/Global";

import { NextUIProvider } from "@nextui-org/react";
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
import ReactGA from "react-ga";
import { useEffect } from "react";

const TRACKING_ID = import.meta.env.VITE_TRACKING_ID;

function App() {
  useEffect(() => {
    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    } else {
      console.warn("Google Analytics tracking ID not found");
    }
  }, []);
  useAuthStateSubscription();

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <NextUIProvider>
              <GlobalStyles />
              <AppRouter />
            </NextUIProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
