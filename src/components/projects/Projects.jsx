import "./projects.scss";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

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
    id:1,
    title:"EcoHub",
    img:"/ecohub.png",
    desc:"EcoHub was a Figma prototype I created as part of my thesis about user-based design and its effects on programming outcomes. I am now working on making this a fully-working website.",
    aboutProject: "This has become a passion project for me. It will also showcase my ever evolving skills in programming and design",
    tags: ["React", "Javascript", "HTML", "Sass", "Figma", "Git"],
    linktosite:"https://github.com/SebuBergman/EcoHub"
  },
  {
    id: 2,
    title:"avone.fi",
    img:"/avone.png",
    desc:"avone.fi is a website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services",
    aboutProject:"This website was built on Wordpress. Just a simple one page website",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite:"https://www.avone.fi"
  },
  {
    id: 3,
    title:"tukikeskustelut.com",
    img:"/tukikeskustelut.png",
    desc:"Tukikeskustelut is a website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    aboutProject:"The website is built on Wordpress using bootstrap for extra styling",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite:"https://www.tukikeskustelut.com"
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
      <a href={item.linktosite} target="_blank" rel="noreferrer">
        <div className="projectsContainer">
          <div className="projectsWrapper">
            <div className="textContainer">
              <div className="textWrapper">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <p>{item.aboutProject}</p>
                <ul>
                  {item.tags.map((tag, index) => (
                    <li key={index}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="imageContainer" ref={ref}>
                <img src={item.img} alt="project image" />
            </div>
          </div>
        </div>
      </a>
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