import "./tech.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';

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
        <h3>Here's what tech i can handle</h3>
      </div>
    </motion.div>
    <motion.div className="listContainer" variants={variants}>
        <Tooltip title={<h1 style={{ color: "white" }}>React</h1>}>
          <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
            <img src="/react-logo.svg" alt="React.js Logo" />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Javascript</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/javascript_logo.svg" alt="Javascript logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Typescript</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/typescript_logo.svg" alt="Typescript logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Node.js</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/node-js_logo.svg" alt="Node.js logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>HTML5</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/html_logo.svg" alt="" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>CSS3</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/css_logo.svg" alt="" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Sass</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/sass_logo.svg" alt="" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>WordPress</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/wordpress_logo.svg" alt="Wordpress logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Figma</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/figma_logo.svg" alt="Figma logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Java</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/java_logo.svg" alt="Java logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>SQL</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/sql_logo.svg" alt="Java logo" />
        </motion.div>
        </Tooltip>
        <Tooltip title={<h1 style={{ color: "white" }}>Git</h1>}>
        <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
          <img src="/git-logo.png" alt="Git logo" />
        </motion.div>
        </Tooltip>
      </motion.div>
  </motion.div>
  );
};

export default Tech;