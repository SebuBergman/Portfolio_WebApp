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
    img: "/ecohub.webp",
    alt: "screenshot of EcoHub application",
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
    img: "/avone.webp",
    alt: "screenshot of avone.fi application",
    desc: "avone.fi is a website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services",
    aboutProject:
      "This website was built on Wordpress. Just a simple one page website",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.avone.fi",
  },
  {
    id: 3,
    title: "tukikeskustelut.com",
    img: "/tukikeskustelut.webp",
    alt: "screenshot of tukikeskustelut.fi application",
    desc: "Tukikeskustelut is a website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    aboutProject:
      "The website is built on Wordpress using bootstrap for extra styling",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.tukikeskustelut.com",
  },
  {
    id: 4,
    title: "Mint",
    img: "/Mint.webp",
    alt: "screenshot of mint web application",
    desc: "With a ”Tinder for jobs” approach, anonymized and values-based matching, and well-being alerts for companies, MINT fosters transparency and mental wellness in hiring.",
    aboutProject:
      "Built (and designed) at Junction Hackathon 2024 in 3 days, MINT matches job seekers with companies prioritizing mental health, inclusion, and growth",
    tags: [
      "React",
      "Typescript",
      "Redux",
      "Firebase",
      "MongoDB",
      "Python (FastAPI)",
    ],
    linktosite: "https://github.com/J24-Cobalt/front-end",
  },
  {
    id: 5,
    title: "leffakirjasto",
    img: "/leffakirjasto.webp",
    alt: "screenshot of leffakirjasto application",
    desc: "This is a personal project for a android app which you can add movies and tv shows to a firebase firestore and search for movies using the MovieDB API.",
    aboutProject: "This app was built with React Native for android",
    tags: ["React Native", "Typescript", "Redux", "Firebase", "Expo"],
    linktosite: "https://github.com/SebuBergman/leffakirjasto",
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
              <img src={item.img} alt={item.alt} />
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
        <motion.h1>My Projects</motion.h1>
        {projectsData.map((item) => (
          <Single item={item} key={item.id} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
