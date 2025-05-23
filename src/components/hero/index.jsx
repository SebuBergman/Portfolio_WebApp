import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

// Import variants data
import { textVariant, sliderVariant } from "@hooks/variants";

export default function Hero() {
  return (
    <div className="heroContainer" id="Home">
      <div className="heroWrapper">
        <motion.div
          className="textContainer"
          variants={textVariant}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariant}>Sebastian Bergman</motion.h2>
          <motion.h1 variants={textVariant}>
            Software developer focused on Full-stack development
          </motion.h1>
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
        <div className="imageContainer">
          <div className="imageWrapper">
            <motion.img
              src="/PictureSebu.jpg"
              alt="image of the pages author"
            />
          </div>
        </div>
        <motion.div className="slidingTextContainer">
          Full-Stack developer with a passion for creating dynamic and
          responsive web applications.
        </motion.div>
      </div>
    </div>
  );
}
