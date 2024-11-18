import { useRef } from "react";
import { motion } from "framer-motion";
import TechIcons from "./icons";

// Import styles
import "./styles.scss";

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
      staggerChildren: 0.12,
    },
  },
};

const Tech = () => {
  const ref = useRef(null);

  return (
    <motion.div
      id="Tech"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="techStack">
        <motion.div>
          <motion.h1>Tech Stack</motion.h1>
          <motion.p>
            Here's programming languages and technologies I can handle.
          </motion.p>
        </motion.div>
        <div className="listContainer">
          <TechIcons variants={variants} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Tech;
