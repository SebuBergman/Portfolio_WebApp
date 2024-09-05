import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import { theme as muiTheme } from "./styles/MuiTheme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/";
import IntroSection from "./components/intro/";
import Projects from "./components/projects/";
import Contact from "./components/contact/";
import Tech from "./components/techStack/";
import Expertise from "./components/expertise/";
import ScrollButton from "./components/scrollbutton/";

// Import styles
import "./app.scss";
import "./main.scss";

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
      staggerChildren: 0.6,
    },
  },
};

const App = ({ visible }) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <section className="introSection">
          <Navbar visible={visible} />
          <IntroSection />
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
