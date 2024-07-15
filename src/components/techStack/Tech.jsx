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
        <h1>My Expertise</h1>
      </div>
      <div className="expertiseContainer">
        <div className="expertiseWrapper">
          <div className="headingWrapper">
            <img src="desktop.svg" />
            <h5>Software <br></br>Development</h5> 
          </div>
          <div className="textContainer">
            <div className="textWrapper"><p>Experienced in both functional and OOP: Java, Javascript, Typescript. Also some experience with Python.</p></div>
          </div>
        </div>
        <div className="expertiseWrapper">
          <div className="headingWrapper">
            <img src="react.svg" />
            <h5>Frontend Dev <br></br>React, Vite</h5> 
          </div>
          <div className="textContainer">
            <div className="textWrapper"><p>Passionate about UX/UI. I have a few years of experience in HTML, CSS, JS, TS, React and Vite frameworks.</p></div>
          </div>
        </div>
        <div className="expertiseWrapper">
          <div className="headingWrapper">
            <img src="responsive.svg" />
            <h5>UI/UX  <br></br>Design</h5> 
          </div>
          <div className="textContainer">
            <div className="textWrapper"><p>Skilled in designing applications with Figma. Experienced in User-based design principles and responsive web design</p></div>
          </div>
        </div>
      </div>
      <div className="background-code_container">
        <img src="carbon.png" className="background-code"/>
      </div>
    </motion.div>
    <motion.div className="techStack">
      <div>
        <h1>Tech Stack</h1>
        <p>Here's programming languages and technologies I can handle.</p>
      </div>
      <div className="listContainer">
        <div className="listWrapper">
          <Tooltip title={<h1 style={{ color: "white" }}>React</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/react-logo.svg" alt="React.js Logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Javascript</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/javascript_logo.svg" alt="Javascript logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Typescript</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/typescript_logo.svg" alt="Typescript logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Node.js</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/node-js_logo.svg" alt="Node.js logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>HTML5</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/html_logo.svg" alt="HTML5_logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>CSS3</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/css_logo.svg" alt="CSS_logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Sass</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/sass_logo.svg" alt="Sass_logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
        </div>
        <div className="listWrapper">
          <Tooltip title={<h1 style={{ color: "white" }}>Java</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/java_logo.svg" alt="Java logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>WordPress</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/wordpress_logo.svg" alt="Wordpress logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Figma</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/figma_logo.svg" alt="Figma logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Framer-motion</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/framer_logo.svg" alt="Framer-motion logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Bootstrap</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/bootstrap_logo.svg" alt="bootstrap logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>SQL</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/sql_logo.svg" alt="Java logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
          <Tooltip title={<h1 style={{ color: "white" }}>Git</h1>}>
            <motion.div className="box" whileHover={{background:"lightgray"}} variants={variants}>
              <img src="/git-logo.png" alt="Git logo" className="techStack-image" />
            </motion.div>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  </motion.div>
  );
};

export default Tech;