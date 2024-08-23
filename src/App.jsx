import "./app.scss";
import "./main.scss";
import Navbar from "./components/navbar/Navbar";
import CoverImage from "./components/intro/IntroSection";
import Projects from "./components/projects/Projects";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Tech from "./components/techStack/Tech";
import Expertise from "./components/expertise/Expertise";
import ScrollButton from "./components/ScrollButton";

const App = ({ visible }) => {
  return (
    <div>
      <section className="introSection">
        <Navbar visible={visible} />
        <CoverImage />
        <ScrollButton />
      </section>
      <section className="portfolioContainer">
        <Expertise />
        <Tech />
        <Projects />
        <Contact />
      </section>
    </div>
  );
};

export default App;