import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./styles.scss";
import projectsData from "./data";
import { slowVariant } from "@hooks/variants";

const Single = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tags = useMemo(
    () => (
      <ul>
        {item.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    ),
    [item.tags]
  );

  return (
    <motion.section
      variants={slowVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
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
              <div className="tagWrapper">{tags}</div>
            </div>
          </div>
          <div
            className={`imageContainer ${imageLoaded ? "loaded" : ""}`}
            onClick={handleOpen}
          >
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box className="modalContent">
              <div className="youtubeContainer">
                {item.youtubeID ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeID}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{ width: item.imageSize }}
                  />
                )}
              </div>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.aboutModal}</Typography>
              {item.linktosite && (
                <Button href={item.linktosite} target="_blank" rel="noreferrer">
                  {item.modalLink}
                </Button>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </motion.section>
  );
};

export default function Projects() {
  const ref = useRef(null);

  return (
    <motion.div
      id="Projects"
      variants={slowVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="projects" variants={slowVariant}>
        <motion.h1>My Projects</motion.h1>
        {projectsData.map((item) => (
          <Single item={item} key={item.id} />
        ))}
      </motion.div>
    </motion.div>
  );
}
