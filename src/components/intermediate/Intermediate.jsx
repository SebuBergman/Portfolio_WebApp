import "./intermediate.scss";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const Intermediate = ({type}) => {
    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div
            className="intermediate"
            ref={ref}
            style={{
                background:
                type === "services"
                    ? "linear-gradient(180deg, #111132, #0c0c1d)"
                    : "linear-gradient(180deg, #111132, #505064)",
            }}
        >
            <motion.h1 style={{ y: yText }}>
                {type === "services" ? "Who Am I?" : "My projects"}
            </motion.h1>
            <motion.div className="background"></motion.div>
            {/*<motion.div style={{ x: yBg }} className="accent"></motion.div>*/}
        </div>
    );
}

export default Intermediate;