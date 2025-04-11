import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button } from "@mui/material";

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
      "This has become a passion project for me. EcoHub front-end is built with React / TypeScript, and the database is made with Firebase. This project also uses firebase for authentication",
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
    youtubeID: "PpG7rtFujiA",
    aboutModal:
      "Designed with user-centered principles to enhance accessibility and usability, focusing on engaging, eco-conscious content. Currently expanding EcoHub from prototype to a fully functional website, implementing responsive design, interactive features, and dynamic routing for multiple pages. Added key functionalities such as a web forum, login/register system, and multi-page navigation to create a cohesive user experience. This project is a work in progress, demonstrating commitment to evolving design into a complete, user-friendly product",
    modalLink: "Visit Github",
  },
  {
    id: 2,
    title: "RAG Agent",
    img: "/rag_agent_2.webp",
    alt: "screenshot of The RAG Agent application",
    desc: "Built a RAG (Retrieval-Augmented Generation) agent using Python, FastAPI, Hugging Face, and OpenAI. Processes PDFs, performs semantic search with MongoDB embeddings, and delivers real-time, context-aware answers through a front-end interface..",
    aboutProject:
      "This project was built with Python, FastAPI, MongoDB and React",
    tags: [
      "React",
      "Python",
      "FastAPI",
      "MongoDB",
      "Amazon S3",
      "Retrieval-Augmented Generation",
      "Hugging Face Transformers",
      "OpenAI API",
      "Semantic Search / Embeddings",
      "Document Upload",
      "PDF Processing",
    ],
    linktosite: "https://github.com/SebuBergman/RAG-Project-frontend",
    youtubeID: "",
    aboutModal:
      "Developed a Retrieval-Augmented Generation (RAG) agent using Python, FastAPI, Hugging Face, and OpenAI. The system processes uploaded PDFs—stored in Amazon S3—by splitting them into sentences and generating embeddings via Hugging Face’s sentence transformer API. It performs semantic search over these embeddings using MongoDB, retrieving relevant context to generate accurate, real-time answers with OpenAI. A front-end interface allows seamless user interaction through a RESTful API.",
    modalLink: "Visit Github",
  },
  {
    id: 3,
    title: "avone.fi",
    img: "/avone.webp",
    alt: "screenshot of avone.fi application",
    desc: "avone.fi is a website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services",
    aboutProject:
      "This website was built on Wordpress. Just a simple one page website",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.avone.fi",
    youtubeID: "",
    aboutModal:
      "avone.fi is a website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services",
    modalLink: "Visit site",
  },
  {
    id: 4,
    title: "tukikeskustelut.com",
    img: "/tukikeskustelut.webp",
    alt: "screenshot of tukikeskustelut.fi application",
    desc: "Tukikeskustelut is a website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    aboutProject:
      "The website is built on Wordpress using bootstrap for extra styling",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite: "https://www.tukikeskustelut.com",
    youtubeID: "",
    aboutModal:
      "Tukikeskustelut is a website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    modalLink: "Visit site",
  },
  {
    id: 5,
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
    youtubeID: "3nbMg8a8-DU",
    aboutModal:
      "Mint was a project we developed for the Junction Hackathon 2024 over the course of three days. We began with simple paper prototyping, then moved on to designing the UI. Our tech stack included a FastAPI (python) backend and a React/TypeScript frontend, where we built a rudimentary Redux store to manage state and fetch data from the backend API. Additionally, we implemented a Tinder-like swiping feature for job positions and job applicants.",
    modalLink: "Visit github",
  },
  {
    id: 6,
    title: "leffakirjasto",
    img: "/leffakirjasto.webp",
    alt: "screenshot of leffakirjasto application",
    desc: "This is a personal project for a android app which you can add movies and tv shows to a firebase firestore and search for movies using the MovieDB API.",
    aboutProject: "This app was built with React Native for android",
    tags: ["React Native", "Typescript", "Redux", "Firebase", "Expo"],
    linktosite: "https://github.com/SebuBergman/leffakirjasto",
    youtubeID: "dtqt1ruM7eE",
    aboutModal:
      "This personal project is an Android app built with React Native. It allows users to search for movies using the MovieDB API and add them to a Firebase Firestore database. Additionally, users can add TV shows, specify a custom number of seasons, and keep track of their ownership status",
    modalLink: "Visit github",
  },
];

const Single = ({ item }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div
            className="imageContainer"
            ref={ref}
            onClick={handleOpen}
            sx={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.alt} style={{ cursor: "pointer" }} />
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "100%", md: "1000px" },
                bgcolor: "background.paper",
                p: 2,
              }}
            >
              <div className="youtubeContainer">
                {item.youtubeID ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeID}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <Typography variant="h6" sx={{ color: "black", pt: 2 }}>
                {item.title}
              </Typography>
              <Typography sx={{ mt: 2, color: "black" }}>
                {item.aboutModal}
              </Typography>
              <Button
                href={item.linktosite}
                target="_blank"
                rel="noreferrer"
                sx={{ mt: 2 }}
              >
                {item.modalLink}
              </Button>
            </Box>
          </Modal>
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
