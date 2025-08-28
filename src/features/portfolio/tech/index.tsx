import { useRef } from "react";
import { motion, Variants } from "motion/react";
import TechIcons from "./icons";
import "./styles.scss";

interface TechProps {
  techContainer: Variants;
  techItem: Variants;
}

export default function Tech({ techContainer, techItem }: TechProps) {
  const ref = useRef(null);

  return (
    <motion.div
      id="Tech"
      className="tech-section"
      variants={techContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <div className="tech-header">
        <motion.h1 className="tech-title" variants={techItem}>
          My Tech Toolkit
        </motion.h1>
        <motion.p className="tech-subtitle" variants={techItem}>
          Technologies I've mastered to build powerful, efficient applications
        </motion.p>
      </div>

      <div className="tech-grid-container">
        <TechIcons variants={techItem} />
      </div>

      <motion.p className="tech-footer" variants={techItem}>
        Continuously expanding my expertise to tackle new challenges
      </motion.p>
    </motion.div>
  );
}
