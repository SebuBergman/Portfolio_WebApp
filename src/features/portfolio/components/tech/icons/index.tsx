import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import "../styles.scss";

export default function TechIcons({ variants }) {
  const techData = [
    {
      name: "React",
      logo: "/react-logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "JavaScript",
      logo: "/javascript_logo.svg",
      colored: true,
      level: "Expert",
    },
    {
      name: "TypeScript",
      logo: "/typescript_logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "Node.js",
      logo: "/node-js_logo.svg",
      colored: true,
      level: "Proficient",
    },
    { name: "HTML5", logo: "/html_logo.svg", colored: true, level: "Expert" },
    { name: "CSS3", logo: "/css_logo.svg", colored: true, level: "Expert" },
    { name: "Sass", logo: "/sass_logo.svg", colored: true, level: "Advanced" },
    {
      name: "Bootstrap",
      logo: "/bootstrap_logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "Material UI",
      logo: "/material-ui_logo.svg",
      colored: true,
      level: "Advanced",
    },
    { name: "Java", logo: "/java_logo.svg", colored: true, level: "Advanced" },
    {
      name: "WordPress",
      logo: "/wordpress_logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "Figma",
      logo: "/figma_logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "Framer Motion",
      logo: "/framer_logo.svg",
      colored: true,
      level: "Proficient",
    },
    { name: "SQL", logo: "/sql_logo.svg", colored: true, level: "Advanced" },
    {
      name: "Python",
      logo: "/python_logo.png",
      colored: true,
      level: "Advanced",
    },
    {
      name: "FastAPI",
      logo: "/FastAPI_logo.svg",
      colored: true,
      level: "Advanced",
    },
    {
      name: "Amazon S3",
      logo: "/amazon_s3_logo.svg",
      colored: true,
      level: "Proficient",
    },
    {
      name: "MongoDB",
      logo: "/mongodb_logo.svg",
      colored: true,
      level: "Proficient",
    },
    { name: "Git", logo: "/git-logo.png", colored: true, level: "Expert" },
  ];

// Define the prop type for variants
interface TechIconsProps {
  variants: any;
}

export default function TechIcons({ variants }: TechIconsProps) {
  return (
    <div className="tech-grid">
      {techData.map((tech) => (
        <Tooltip
          key={tech.name}
          title={
            <div className="tooltip-content">
              <h3>{tech.name}</h3>
              {tech.level && <p>{tech.level}</p>}
            </div>
          }
          arrow
        >
          <motion.div
            className="tech-item"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(36, 136, 35, 0.2)",
              boxShadow: "0 0 15px rgba(36, 136, 35, 0.3)",
            }}
            variants={variants}
            transition={{ duration: 0.2 }}
          >
            <img
              src={tech.logo}
              alt={`${tech.name} logo`}
              className="tech-icon"
            />
            <span className="tech-name">{tech.name}</span>
          </motion.div>
        </Tooltip>
      ))}
    </div>
  );
}
