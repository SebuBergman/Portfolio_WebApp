import { useRef } from "react";
import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

const variants = {
  initial: {
    x: -300,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.6,
    },
  },
};

const projectsData = [
  {
    id: 1,
    title: "EcoHub",
    img: "/ecohub.png",
    desc: "EcoHub was a Figma prototype I created as part of my thesis about user-based design and its effects on programming outcomes. I am now working on making this a fully-working website.",
    aboutProject:
      "This has become a passion project for me. EcoHub front-end is built with React, back-end will be made with Node.js/Express and the database will be made with mongoDB/SQL and Firebase. This project also uses firebase for authentication",
    tags: [
      "Figma",
      "React",
      "Sass",
      "Bootstrap",
      "Styled-components",
      "Prop-types",
      "Bootstrap",
      "Swiper",
      "Firebase",
      "Node.js/Express",
      "MongoDB/SQL",
    ],
    linktosite: "https://github.com/SebuBergman/EcoHub",
  },
  {
    id: 2,
    title: "avone.fi",
    img: "/avone.png",
    desc: "avone.fi is a website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services",
    aboutProject:
      "This website was built on Wordpress. Just a simple one page website",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.avone.fi",
  },
  {
    id: 3,
    title: "tukikeskustelut.com",
    img: "/tukikeskustelut.png",
    desc: "Tukikeskustelut is a website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    aboutProject:
      "The website is built on Wordpress using bootstrap for extra styling",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.tukikeskustelut.com",
  },
];

const Single = ({ item }) => {
  const ref = useRef(null);

  return (
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <div className="projectsContainer">
        <div className="projectsWrapper">
          <div className="textContainer">
            <div className="textWrapper">
              <a href={item.linktosite} target="_blank" rel="noreferrer">
                <h3>{item.title}</h3>
              </a>
              <p>{item.desc}</p>
              <p>{item.aboutProject}</p>
              <div className="tagWrapper">
                <ul>
                  {item.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="imageContainer" ref={ref}>
            <a href={item.linktosite} target="_blank" rel="noreferrer">
              <img src={item.img} alt="project image" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Projects = () => {
  const ref = useRef(null);

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
        <h1>My Projects</h1>
        {projectsData.map((item) => (
          <Single item={item} key={item.id} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
