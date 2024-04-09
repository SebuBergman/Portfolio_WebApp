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
          <h1>My projects & references</h1>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img></img>
          <h2>tukikeskustelut.com</h2>
          <p>Tukikeskustelut is a Finnish entrepreneur's business website. The entrepreneur does brief therapy, counselling, crisis work & NUOTTI coaching </p>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img></img>
          <h2>avone.fi</h2>
          <p>Avone is a Finnish entrepreneur's business website. Are you looking for a modern SEO friendly implementation for your website. Or a great newsletter service for your message. In need of a website this entrepreneur has you covered</p>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img></img>
          <h2>More coming soon</h2>
          <p>Lorem Ipsum</p>
        </motion.div>
        <motion.div className="box" whileHover={{background:"lightgray", color:"black"}}>
          <img></img>
          <h2>More coming soon</h2>
          <p>Lorem Ipsum</p>
        </motion.div>
      </motion.div>
    </motion.div>
)
}

export default About;