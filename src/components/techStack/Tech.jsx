import "./tech.scss";
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

const Tech = () => {
  const ref = useRef()

  const isInView = useInView(ref,{margin:"-100px"})

return (
  <motion.div
    className="tech"
    variants={variants}
    initial="initial"
    ref={ref}
    animate={"animate"}
  >
    <motion.div className="titleContainer" variants={variants}>
      <div className="title">
        <h1>My tech stack</h1>
        <h3>Here's what I can handle</h3>
      </div>
    </motion.div>
    <motion.div className="listContainer" variants={variants}>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/react-logo.svg" alt="" />
          <h2>React</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/javascript-logo.png" alt="" />
          <h2>JavaScript</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/typescript-logo.png" alt="" />
          <h2>TypeScript</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/HTML_logo.png" alt="" />
          <h2>HTML</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/CSS_logo.png" alt="" />
          <h2>CSS</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/Sass_logo.png" alt="" />
          <h2>Sass</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/java-logo.png" alt="" />
          <h2>Java</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/wordpress-logo.svg" alt="" />
          <h2>WordPress</h2>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}} variants={variants}>
          <img src="/git-logo.png" alt="" />
          <h2>Git</h2>
        </motion.div>
      </motion.div>
  </motion.div>
  );
};

export default Tech;