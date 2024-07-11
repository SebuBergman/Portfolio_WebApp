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
      <p className="textContainer_p">
        I am experienced in front-end development,<br />UX/UI design & user-based design principles
      </p>
      <hr className="textContainer_hr" />
    </motion.div>
    <motion.div className="titleContainer" variants={variants}>
      <div className="aboutText">
        <h1 className="heading">Sebastian Bergman</h1>
        <hr className="header_seperator"></hr>
        <p>I am a programmer with a Bachelor's degree in Business Information Technology from Haaga-Helia University of Applied Sciences.
        Over the course of my three-year program, I honed my expertise in various programming languages, including <b>React</b>, <b>JavaScript</b>, <b>TypeScript</b>, <b>Java</b>, and <b>Python</b>.
        Additionally, I have gained valuable experience in project management methodologies such as <b>Scrum</b> and <b>Kanban</b>, as well as <b>responsive website</b> and <b>user-centered design</b>.</p>
        <p>My passion for IT drives me to continuously improve my problem-solving skills and quickly adapt to new technologies.
          I am fluent in both English and Finnish, and I am eager to embrace new opportunities in the tech industry.
          Let’s connect and bring exciting projects to life together!</p>
        {/*<h3>Front-end programmer</h3>*/}
      </div>
    </motion.div>
    
    </motion.div>
  );
};

export default About;