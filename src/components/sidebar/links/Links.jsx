import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const openningVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const closingVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = ({ setOpen }) => {
  const items = ["About", "Expertise", "Tech", "Projects", "Contact"];

  return (
    <motion.div className="links" variants={openningVariants}>
        {items.map(item=>(
            <motion.a
              href={`#${item}`}
              key={item}
              variants={closingVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen((prev) => !prev)}
            >
              {item}
            </motion.a>
        ))}
    </motion.div>
  );
};

export default Links;