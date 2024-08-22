import "./expertise.scss";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';

const variants = {
  initial: {
    x: -300,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.4,
    },
  },
};

const Expertise = () => {
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
      <motion.div className="titleContainer" variants={variants} ref={ref}>
        <motion.div className="title">
          <h1>My Expertise</h1>
        </motion.div>
        <div className="expertiseContainer">
          <motion.div className="expertiseWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="desktop.svg" />
              <h5><span className="heading-underline-blue">Software</span><br />Development</h5> 
            </div>
            <div className="textContainer">
              <div className="textWrapper"><p>Experienced in both functional and OOP: Java, Javascript, Typescript. Also some experience with Python.</p></div>
            </div>
          </motion.div>
          <motion.div className="expertiseWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="react.svg" />
              <h5><span className="heading-underline-orange">Frontend Dev</span><br></br>React, Vite</h5> 
            </div>
            <div className="textContainer">
              <div className="textWrapper"><p>Passionate about UX/UI. I have a few years of experience in HTML, CSS, JS, TS, React framework.</p></div>
            </div>
          </motion.div>
          <motion.div className="expertiseWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" />
              <h5><span className="heading-underline-rose">UI/UX</span><br></br>Design</h5> 
            </div>
            <div className="textContainer">
              <div className="textWrapper"><p>Skilled in designing applications with Figma. Experienced in User-based design principles and responsive web design</p></div>
            </div>
          </motion.div>
        </div>
        <div className="background-code_container">
          <img src="carbon2.png" className="background-code"/>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Expertise;