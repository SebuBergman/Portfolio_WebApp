import { motion } from "motion/react";
import { useEffect, useState } from "react";

const words = [
  "Full-Stack Developer",
  "React Enthusiast",
  "TypeScript Lover",
  "Node.js Explorer",
  "UI/UX Tinkerer",
];

export default function TypingText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === words.length) return;

    // current word
    const word = words[index];

    // Speed: faster when deleting
    const speed = deleting ? 50 : 120;

    const timeout = setTimeout(() => {
      if (!deleting && subIndex === word.length) {
        // pause at full word
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && subIndex === 0) {
        // move to next word
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        // typing or deleting characters
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <div className="typingText">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {words[index].substring(0, subIndex)}
      </motion.span>
      <span className="cursor">|</span>
    </div>
  );
}
