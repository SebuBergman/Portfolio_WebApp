import { useRef } from "react";
import { motion } from "framer-motion";
import TechIcons from "./icons";

// Import styles
import "./styles.scss";

// Import variants data
import { fastVariant } from "@hooks/variants";

const Tech = () => {
  const ref = useRef(null);

  return (
    <motion.div
      id="Tech"
      variants={fastVariant}
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
          <TechIcons variants={fastVariant} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Tech;
