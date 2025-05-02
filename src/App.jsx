import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import { theme as muiTheme } from "./styles/MuiTheme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// Components
import Navbar from "@components/navbar/";
import ScrollButton from "@components/scrollbutton/";

// Page components
import Hero from "@components/hero/";
import Expertise from "@components/expertise/";
import Tech from "@components/tech/";
import Projects from "@components/projects/";
import Contact from "@components/contact/";

// Import styles
import "./app.scss";

// Import variants data
import { mediumVariant } from "@hooks/variants";

const App = () => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <section className="headerContainer">
          <Navbar />
          <Hero />
          <ScrollButton />
        </section>
        <section className="portfolioContainer">
          <Expertise variants={mediumVariant} />
          <Tech />
          <Projects variants={mediumVariant} />
          <Contact variants={mediumVariant} />
        </section>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
