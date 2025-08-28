import { useRef } from "react";
import { motion, Variants } from "motion/react";
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
  sectionContainer: Variants;
  sectionItem: Variants;
}

export default function Projects({
  sectionContainer,
  sectionItem,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      id="Projects"
      variants={sectionContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="projects" variants={sectionContainer}>
        <motion.h1 variants={sectionItem}>My Projects</motion.h1>
        {projectsData.map((item: ProjectItem) => (
          <Single item={item} key={item.id} variants={sectionItem} />
        ))}
      </motion.div>
    </motion.div>
  );
}
