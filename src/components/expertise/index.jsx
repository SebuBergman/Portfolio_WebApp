import { useRef } from "react";
import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

const Expertise = ({ variants }) => {
  const ref = useRef(null);

  return (
    <motion.div
      id="Expertise"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="expertiseContainer" variants={variants} ref={ref}>
        <motion.div className="title">
          <h1>My Expertise</h1>
        </motion.div>
        <div className="boxContainer">
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="desktop.svg" alt="desktop icon" />
              <h5>
                <span className="heading-underline-blue">Software</span>
                <br />
                Development
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  Experienced in both functional and OOP: Java, Javascript,
                  Typescript. Also some experience with Python.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="react.svg" alt="react icon" />
              <h5>
                <span className="heading-underline-orange">Frontend Dev</span>
                <br></br>React, Vite
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  Passionate about UX/UI. I have a few years of experience in
                  HTML, CSS, JS, TS, React framework. I also have skills in a
                  few other frameworks
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" alt="computer and mobile screen icon" />
              <h5>
                <span className="heading-underline-rose">UI/UX</span>
                <br></br>Design
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  Skilled in designing applications with Figma. Experienced in
                  User-based design principles and responsive web design
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" alt="computer and mobile screen icon" />
              <h5>
                <span className="heading-underline-rose">Backend & APIs</span>
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  Experience building APIs using FastAPI and working with
                  Node.js. Comfortable integrating OpenAI APIs and managing data
                  with MongoDB.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div className="background-code_container">
          <motion.img
            src="carbon2.png"
            className="background-code"
            alt="code background image"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Expertise;
