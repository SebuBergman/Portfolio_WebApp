import "./cover.scss";
import { motion } from "framer-motion";

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
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
            duration: 20,
        },
    },
};

const CoverImage = () => {
    return (
        <div className="coverImage">
            <div className="wrapper">
                <motion.div
                    className="textContainer"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h2 variants={textVariants}>Sebastian Bergman</motion.h2>
                    <motion.h1 variants={textVariants}>Web developer and UI/UX Designer</motion.h1>
                    <motion.div className="buttons">
                        <a href="#Projects"><motion.button variants={textVariants}>See my latest work</motion.button></a>
                        <a href="#Contact"><motion.button variants={textVariants}>Contact me</motion.button></a>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="slidingTextContainer"
                    variants={sliderVariants}
                    initial="initial"
                    animate="animate">
                    Front-end development UX/UI design IT knowledge
                </motion.div>
                <div className="imageContainer">
                    <img src="/SebuKuva_IlmanTaustaa.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CoverImage;