import "./app.scss";
import "./main.scss";
import Navbar from "./components/navbar/Navbar";
import IntroSection from "./components/intro/IntroSection";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import Tech from "./components/techStack/Tech";
import Expertise from "./components/expertise/Expertise";
import ScrollButton from "./components/ScrollButton";

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
    <div>
      <section className="introSection">
        <Navbar visible={visible} />
        <IntroSection  />
        <ScrollButton />
      </section>
      <section className="portfolioContainer">
        <Expertise variants={variants}/>
        <Tech />
        <Projects variants={variants}/>
        <Contact variants={variants}/>
      </section>
    </div>
  );
};

export default App;