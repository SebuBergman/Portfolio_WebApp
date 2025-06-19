import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import Single from "./single";

import projectsData from "./data";

interface ProjectItem {
  id: string | number;
  title: string;
  desc: string;
  aboutProject: string;
  tags: string[];
  linktosite: string;
  img: string;
  alt: string;
  youtubeID?: string;
  imageSize?: string | number;
  aboutModal?: string;
  modalLink?: string;
}

interface ProjectProps {
  variants: Variants;
}

export default function Projects({ variants }: ProjectProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      id="Projects"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="projects" variants={variants}>
        <motion.h1>My Projects</motion.h1>
        {projectsData.map((item: ProjectItem) => (
          <Single item={item} key={item.id} />
        ))}
      </motion.div>
    </motion.div>
  );
}
