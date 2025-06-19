import { motion } from "framer-motion";

// Import variants data
import { openingVariant, closingVariant } from "@hooks/variants";

export default function Links() {
  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Expertise", id: "expertise" },
    { label: "Packages and Prices", id: "packages-prices" },
    { label: "References", id: "references" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.div className="links" variants={openingVariant}>
      {navItems.map((item) => (
        <motion.a
          href={`#${item.label}`}
          key={item.id}
          variants={closingVariant}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
