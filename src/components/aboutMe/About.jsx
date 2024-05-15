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
        <h3>Novice programmer</h3>
      </div>
    </motion.div>
    <motion.div className="aboutContainer" variants={variants}>
      <p>I am a novice programmer with a Bachelor's in Business Information Technology from Haaga-Helia University of Applied Sciences. Over three years, 
        I've developed expertise in programming languages like <b>React, Javascript, TypeScript, Java, Python</b>, and more. </p>
      <p>My skills also include project management with <b>Scrum and Kanban, website design, and user-centered design</b>. 
        I'm passionate about IT, with a knack for <b>problem-solving and quick learning</b>.  </p>
      <p>Fluent in English and Finnish, I'm eager to explore new opportunities in the tech world.</p>
      <p>Let's connect and bring exciting projects to life!</p>
    </motion.div>
    </motion.div>
  );
};

export default About;