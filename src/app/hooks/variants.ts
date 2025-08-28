export const sidebarVariant = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring" as const,
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.4,
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
};

export const openingVariant = {
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

export const closingVariant = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

// Hero section variants
export const textContainerVariant = {
  initial: { opacity: 0, x: -400 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.15,
    },
  },
};

export const textItemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const scrollButtonVariant = {
  animate: {
    opacity: [1, 0, 1],
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

// variants/typingVariant.ts
export const typingContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // speed of typing
      delayChildren: i * 0.04,
    },
  }),
};

export const typingChar = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* Expertise / Contact */
export const sectionContainer = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

export const sectionItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

/* Tech section (fade + rise) */
export const techContainer = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.8 },
  },
};

export const techItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
