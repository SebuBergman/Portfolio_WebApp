// Components
import Navbar from "@features/portfolio/navbar/";
import ScrollButton from "@features/portfolio/scrollbutton/";

// Page components
import Hero from "@features/portfolio/hero/";
import Expertise from "@features/portfolio/expertise/";
import Tech from "@features/portfolio/tech/";
import Projects from "@features/portfolio/projects/";
import Contact from "@features/portfolio/contact/";

// Import styles
import "@app/app.scss";

// Import variants data
import { mediumVariant, slowVariant } from "@app/hooks/variants";
import { Box } from "@mui/material";

export default function Portfolio() {
  return (
    <Box>
      <section className="headerContainer">
        <Navbar />
        <Hero />
        <ScrollButton />
      </section>
      <section className="portfolioContainer">
        <Expertise variants={mediumVariant} />
        <Tech />
        <Projects variants={slowVariant} />
        <Contact variants={mediumVariant} />
      </section>
    </Box>
  );
}
