import "./projects.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  {
    id:1,
    title:"tukikeskustelut.com",
    img:"./assets/tukikeskustelut.com.jpg",
    desc:"Website for a Finnish entrepreneur who offers brief therapy, work counselling and crisis work & NUOTTI coaching"
  },
  {id: 2,
  title:"avone.fi",
  img:"./assets/avone.fi.jpg",
  desc:"Website for a Finnish entrepreneur who offers website, newsletter & seo optimization services",
  }
];

const Single = ({item}) => {
  return (
    <section>
      {item.title}
    </section>
  )
}

const Projects = () => {
  return (
    <div className="projects">
      {items.map(item=>(
        <Single item={item} key={item.id}/>
      ))}
    </div>
  );
}

export default Projects;