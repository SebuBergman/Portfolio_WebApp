import "./app.scss";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
      <div>
        <section>
          <Navbar/>
        </section>
        <section>About</section>
        <section>Overview</section>
        <section>My Path</section>
        <section>Tech</section>
        <section>Projects</section>
        <section>Contact</section>
      </div>
  );
}

export default App;