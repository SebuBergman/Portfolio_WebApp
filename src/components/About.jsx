import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/Motion";

export default function About() {
  return (
    <motion.div variants={textVariant()}>
      <div>
        <h2>Introduction</h2>
        <p>
          I'm a skilled software developer with experience in Typescript and
          Javascript, and expertise in frameworks like React & node.js. I also
          posses knowledge in HTML & CSS, Java, SQL and Python I'm a quick
          learner and always in search of new challenges. I work well in a group
          but also work well independently. Let's work together to bring your
          ideas to life!
        </p>
      </div>
    </motion.div>
  );
}
