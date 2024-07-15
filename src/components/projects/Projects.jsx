import "./projects.scss";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const projectsData = [
  {
    id:1,
    title:"tukikeskustelut.com",
    img:"/tukikeskustelut.png",
    desc:"Website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching as a services",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite:"https://www.tukikeskustelut.com"
  },
  {
    id: 2,
    title:"avone.fi",
    img:"/avone.png",
    desc:"Website for a Finnish entrepreneur who offers WordPress development & maintenance, website creation, newsletter & SEO optimization services.",
    tags: ["WordPress", "Bootstrap", "HTML", "CSS"],
    linktosite:"https://www.avone.fi"
  },
  {
    id: 3,
    title:"EcoHub",
    img:"/ecohub.png",
    desc:"EcoHub was a Figma prototype I created as part of my thesis about user-based design and its effects on programming outcomes. I am now working on making this a fully-working website.",
    tags: ["React", "Javascript", "HTML", "Sass", "Figma", "Git"],
    linktosite:"https://github.com/SebuBergman/EcoHub"
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  return (
    <section >
      <a href={item.linktosite} target="_blank" rel="noreferrer">
        <div className="projectsContainer">
          <div className="projectsWrapper">
            <div className="textContainer">
              <div className="textWrapper">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
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
    </section>
  );
};

const Projects = () => {
  const ref = useRef();

  return (
    <div className="projects" ref={ref}>
      <h1>My Projects</h1>
      {projectsData.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Projects;