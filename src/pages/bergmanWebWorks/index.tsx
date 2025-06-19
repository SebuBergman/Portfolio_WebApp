// Components
import Navbar from "@features/bergmanWebWorks/components/navbar/";
import ScrollButton from "@features/bergmanWebWorks/components/scrollbutton/";

// Page components
import Hero from "@features/bergmanWebWorks/components/hero/";
import Expertise from "@features/bergmanWebWorks/components/expertise/";
import References from "@features/bergmanWebWorks/components/references";
import Contact from "@features/bergmanWebWorks/components/contact/";
import Packages from "@features/bergmanWebWorks/components/packages";

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
