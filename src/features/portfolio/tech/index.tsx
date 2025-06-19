import { useRef } from "react";
import { motion } from "framer-motion";
import TechIcons from "./icons";
import "./styles.scss";
import { fastVariant } from "@hooks/variants";

export default function Tech() {
  const ref = useRef(null);

  return (
    <motion.div
      id="Tech"
      className="tech-section"
      variants={fastVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <div className="tech-header">
        <motion.h1 className="tech-title">My Tech Toolkit</motion.h1>
        <motion.p className="tech-subtitle">
          Technologies I've mastered to build powerful, efficient applications
        </motion.p>
      </div>

      <div className="tech-grid-container">
        <TechIcons variants={fastVariant} />
      </div>

      <motion.p className="tech-footer">
        Continuously expanding my expertise to tackle new challenges
      </motion.p>
    </motion.div>
  );
}
