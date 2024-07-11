import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import CoverImage from "./components/intro/IntroSection";
import Projects from "./components/projects/Projects";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Tech from "./components/techStack/Tech";

const App = () => {
  return (
      <div>
        <section className="introSection">
          <Navbar/>
          <CoverImage/>
        </section>
        <section className="portfolioContainer">
          <About/>
          <Tech />
          <Projects />
          <Contact />
        </section>
      </div>
  );
}

export default App;