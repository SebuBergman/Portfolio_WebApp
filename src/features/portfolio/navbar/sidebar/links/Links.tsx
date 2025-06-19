import { motion } from "framer-motion";

// Import variants data
import { openingVariant, closingVariant } from "@hooks/variants";

export default function Links() {
  const items = ["Home", "Expertise", "Tech", "Projects", "Contact"];

  return (
    <motion.div className="links" variants={openingVariant}>
      {items.map((item) => (
        <motion.a
          href={`#${item}`}
          key={item}
          variants={closingVariant}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item}
        </motion.a>
      ))}
    </motion.div>
  );
}
