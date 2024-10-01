import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import { theme as muiTheme } from "./styles/MuiTheme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// Components
import Navbar from "@components/navbar/";
import ScrollButton from "@components/scrollbutton/";

// Page components
import Hero from "@pagecomponents/hero/";
import Expertise from "@pagecomponents/expertise/";
import Tech from "@pagecomponents/techStack/";
import Projects from "@pagecomponents/projects/";
import Contact from "@pagecomponents/contact/";

// Import styles
import "./app.scss";

const variants = {
  initial: {
    x: -300,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.45,
    },
  },
};

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
          <Expertise variants={variants} />
          <Tech />
          <Projects variants={variants} />
          <Contact variants={variants} />
        </section>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
