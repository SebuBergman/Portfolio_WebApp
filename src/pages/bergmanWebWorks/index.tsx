// Components
import Navbar from "@features/bergmanWebWorks/navbar/";
import ScrollButton from "@features/bergmanWebWorks/scrollbutton/";

// Page components
import Hero from "@features/bergmanWebWorks/hero/";
import Expertise from "@features/bergmanWebWorks/expertise/";
import References from "@features/bergmanWebWorks/references";
import Contact from "@features/bergmanWebWorks/contact/";
import Packages from "@features/bergmanWebWorks/packages";

// Import styles
import "@app/app.scss";

// Import variants data
import { mediumVariant, slowVariant } from "@app/hooks/variants";
import { Box } from "@mui/material";

const FrontPage = () => {
  return (
    <Box>
      <section className="headerContainer">
        <Navbar />
        <Hero />
        <ScrollButton />
      </section>
      <section className="portfolioContainer">
        <Expertise variants={mediumVariant} />
        <Packages variants={mediumVariant} />
        <References variants={slowVariant} />
        <Contact variants={mediumVariant} />
      </section>
    </Box>
  );
};

export default FrontPage;
