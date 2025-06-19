import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";

// Import styles
import "./styles.scss";

// Define the prop type for variants
interface TechIconsProps {
  variants: any;
}

export default function TechIcons({ variants }: TechIconsProps) {
  return (
    <>
      <div className="listWrapper">
        <Tooltip title={<h2 style={{ color: "white" }}>React</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/react-logo.svg"
              alt="React.js Logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip
          className="TooltipText"
          title={<h2 style={{ color: "white", padding: "0" }}>Javascript</h2>}
        >
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/javascript_logo.svg"
              alt="Javascript logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Typescript</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/typescript_logo.svg"
              alt="Typescript logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Node.js</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/node-js_logo.svg"
              alt="Node.js logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>HTML5</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/html_logo.svg"
              alt="HTML5_logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>CSS3</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/css_logo.svg"
              alt="CSS_logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Sass</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/sass_logo.svg"
              alt="Sass_logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Bootstrap</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/bootstrap_logo.svg"
              alt="bootstrap logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Material UI</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/material-ui_logo.svg"
              alt="Material UI logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
      </div>
      <div className="listWrapper">
        <Tooltip title={<h2 style={{ color: "white" }}>Java</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/java_logo.svg"
              alt="Java logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>WordPress</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/wordpress_logo.svg"
              alt="Wordpress logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Figma</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/figma_logo.svg"
              alt="Figma logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Framer-motion</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/framer_logo.svg"
              alt="Framer-motion logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>SQL</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/sql_logo.svg"
              alt="Java logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Python</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/python_logo.png"
              alt="Python logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>FastAPI</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/FastAPI_logo.svg"
              alt="FastAPI logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<h2 style={{ color: "white" }}>Amazon S3</h2>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/amazon_s3_logo.svg"
              alt="Amazon S3 logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
        <Tooltip title={<span style={{ color: "white" }}>Git</span>}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray" }}
            variants={variants}
          >
            <img
              src="/git-logo.png"
              alt="Git logo"
              className="techStack-image"
            />
          </motion.div>
        </Tooltip>
      </div>
    </>
  );
}
