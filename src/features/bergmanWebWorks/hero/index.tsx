import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

// Import variants data
import { textVariant, sliderVariant } from "@hooks/variants";

export default function Hero() {
  return (
    <div className="heroContainer" id="hero">
      <div className="heroWrapper">
        <motion.div
          className="textContainer"
          variants={textVariant}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={textVariant}>
            Web Applications That Drive Your Business Forward
          </motion.h1>
          <motion.p>
            At BergmanWebWorks, I create modern, high-performance web
            applications tailored to your goals. Whether you need a sleek
            landing page, a custom e-commerce platform, or a powerful internal
            tool, I bring your ideas to life with clean code, thoughtful design,
            and reliable support.
          </motion.p>
          <motion.div className="buttons">
            <a href="#Projects">
              <motion.button variants={textVariant}>Projects</motion.button>
            </a>
            <a href="#Contact">
              <motion.button variants={textVariant}>Contact</motion.button>
            </a>
          </motion.div>
          <motion.img
            variants={textVariant}
            animate="scrollButtonAnimation"
            src="scroll-icon.png"
            alt="scroll icon"
          />
        </motion.div>
        <motion.div
          className="slidingTextContainer"
          variants={sliderVariant}
          initial="initial"
          animate="animate"
        >
          Front-end developepment & UX/UI designing with extensive IT knowledge
        </motion.div>
        <div className="imageContainer">
          <div className="imageWrapper">
            <motion.img
              src="/PictureSebu.jpg"
              alt="image of the pages author"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
