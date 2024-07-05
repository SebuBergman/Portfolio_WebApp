import "./about.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const ref = useRef()

  const isInView = useInView(ref,{margin:"-100px"})

return (
  <motion.div
    className="about"
    variants={variants}
    initial="initial"
    // animate="animate"
    // whileInView="animate"
    ref={ref}
    animate={"animate"}
  >
    <motion.div className="textContainer" variants={variants}>
      <p>
        I am experienced in front-end development,<br />UX/UI design & user-based design principles
      </p>
      <hr />
    </motion.div>
    <motion.div className="titleContainer" variants={variants}>
      <div className="title">
        <h1>Sebastian Bergman</h1>
        <h3>Front-end programmer</h3>
      </div>
    </motion.div>
    <motion.div className="aboutContainer" variants={variants}>
      <p>I am a programmer with a Bachelor's degree in Business Information Technology from Haaga-Helia University of Applied Sciences.
        Over the course of my three-year program, I honed my expertise in various programming languages, including React, JavaScript, TypeScript, Java, and Python.
        Additionally, I have gained valuable experience in project management methodologies such as Scrum and Kanban, as well as responsive website and user-centered design.</p>
      <p>My passion for IT drives me to continuously improve my problem-solving skills and quickly adapt to new technologies.
        
        I am fluent in both English and Finnish, and I am eager to embrace new opportunities in the tech industry.
        
        Let’s connect and bring exciting projects to life together!</p>
    </motion.div>
    </motion.div>
  );
};

export default About;