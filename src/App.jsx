import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import CoverImage from "./components/coverPhoto/CoverImage";

const App = () => {
  return (
      <div>
        <section>
          <Navbar/>
          <CoverImage/>
        </section>
        <section id="About">About</section>
        <section id="Overview">Overview</section>
        <section id="My Path">My Path</section>
        <section id="Tech">Tech</section>
        <section id="Projects">Projects</section>
        <section id="Contact">Contact</section>
      </div>
  );
}

export default App;