import { motion } from "motion/react";
import TypingText from "./typingText";

// Import styles
import "./styles.scss";

// Import variants data
import {
  textContainerVariant,
  textItemVariant,
  scrollButtonVariant,
} from "@hooks/variants";

export default function Hero() {
  return (
    <div className="heroContainer" id="Home">
      <div className="heroWrapper">
        <motion.div
          className="textContainer"
          variants={textContainerVariant}
          initial="initial"
          animate="animate"
        >
          <div>
            <motion.h2 variants={textItemVariant}>Sebastian Bergman</motion.h2>
            <motion.h1 variants={textItemVariant}>
              Software developer focused on Full-stack development
            </motion.h1>
            <TypingText />
          </div>
          <motion.div className="buttons">
            <a href="#Projects">
              <motion.button variants={textItemVariant}>Projects</motion.button>
            </a>
            <a href="#Contact">
              <motion.button variants={textItemVariant}>Contact</motion.button>
            </a>
          </motion.div>
          <motion.img
            variants={scrollButtonVariant}
            animate="scrollButtonAnimation"
            src="scroll-icon.png"
            alt="scroll icon"
          />
        </motion.div>
        <div className="imageContainer">
          <div className="imageWrapper">
            <motion.img
              src="/PictureSebu.webp"
              alt="image of the pages author"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
