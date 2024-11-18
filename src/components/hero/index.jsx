import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

const textVariants = {
  initial: {
    x: -400,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.15,
    },
  },
  scrollButtonAnimation: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      reoeatType: "mirror",
      duration: 15,
    },
  },
};

const Hero = () => {
  return (
    <div className="heroContainer" id="Home">
      <div className="heroWrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>Sebastian Bergman</motion.h2>
          <motion.h1 variants={textVariants}>
            Software developer focused on Front-End development
          </motion.h1>
          <motion.div className="buttons">
            <a href="#Projects">
              <motion.button variants={textVariants}>Projects</motion.button>
            </a>
            <a href="#Contact">
              <motion.button variants={textVariants}>Contact</motion.button>
            </a>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButtonAnimation"
            src="scroll-icon.png"
            alt="scroll icon"
          />
        </motion.div>
        <motion.div
          className="slidingTextContainer"
          variants={sliderVariants}
          initial="initial"
          animate="animate"
        >
          Front-end developer & UX/UI designer with extensive IT knowledge
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
};

export default Hero;
