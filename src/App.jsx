import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import CoverImage from "./components/coverPhoto/CoverImage";
import Projects from "./components/projects/Projects";
import About from "./components/aboutMe/About";
import Intermediate from "./components/intermediate/Intermediate";
import Contact from "./components/contact/Contact";
import Tech from "./components/techStack/Tech";

const App = () => {
  return (
      <div>
        <section>
          <Navbar/>
          <CoverImage/>
        </section>
        <section id="Services">
          <Intermediate type="services" />
        </section>
        <section id="About">
          <About/>
        </section>
        <section id="Tech">
          <Tech />
        </section>
        <section id="Projects">
          <Intermediate type="projects" />
        </section>
        <Projects />
        <section id="Contact">
          <Contact />
        </section>
      </div>
  );
}

export default App;