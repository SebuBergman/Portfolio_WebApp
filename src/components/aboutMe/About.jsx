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
    className="projects"
    variants={variants}
    initial="initial"
    // animate="animate"
    // whileInView="animate"
    ref={ref}
    animate={isInView && "animate"}
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
      <p>
        Hello! I am a novice programmer with a Bachelor's in Business Information Technology from Haaga-Helia University of Applied Sciences. Over three years, 
        I've developed expertise in programming languages like React, React Native, JavaScript, Java, Python, and more. 
        My skills also include project management with Scrum and Kanban, website design, and user-centered design. 
        I'm passionate about IT, with a knack for problem-solving and quick learning. Fluent in English and Finnish, I'm eager to explore new opportunities in the tech world. 
      </p>
      <p>Let's connect and bring exciting projects to life!</p>
    </motion.div>
    <motion.div className="listContainer" variants={variants}>
      <motion.div className="aboutText">
        <h3>My Skills</h3>
      </motion.div>
      <motion.div className="skillsContainer" variants={variants}>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/react-logo.svg" alt="" />
          <h2>React</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/javascript-logo.png" alt="" />
          <h2>JavaScript</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/typescript-logo.png" alt="" />
          <h2>TypeScript</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/CSS-HTML5-logo.png" alt="" />
          <h2>HTML & CSS</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/java-logo.png" alt="" />
          <h2>Java</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/wordpress-logo.svg" alt="" />
          <h2>WordPress</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/git-logo.png" alt="" />
          <h2>Git</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img src="/UX_logo.png" alt="" />
          <h2>UX/UI design</h2>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
  );
};

export default About;