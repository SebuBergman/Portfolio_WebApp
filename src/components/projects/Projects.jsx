import "./projects.scss";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id:1,
    title:"tukikeskustelut.com",
    img:"/tukikeskustelut.png",
    desc:"Website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching",
    linktosite:"www.tukikeskustelut.com"
  },
  {
    id: 2,
    title:"avone.fi",
    img:"/avone.png",
    desc:"Website for a Finnish entrepreneur who offers website, newsletter & seo optimization services",
    linktosite:"www.avone.fi"
  },
  {
    id: 2,
    title:"EcoHub",
    img:"/ecohub.png",
    desc:"EcoHub was a figma prototype i created as part of my thesis about user-based design and it's affects on programming outcomes. This might become a full programming project for me"
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          <a href={item.linktosite} target="_blank" rel="noreferrer" className="button" >Go to page</a>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="projects" ref={ref}>
      <div className="references">
        <h1>Projects / portfolio</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Projects;