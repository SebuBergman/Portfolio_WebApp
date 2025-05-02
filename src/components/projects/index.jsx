import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button } from "@mui/material";

// Import styles
import "./styles.scss";

// Import projects data
import projectsData from "./data";

// Import variants data
import { slowVariant } from "@hooks/variants";

const Single = ({ item }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <motion.section
      variants={slowVariant}
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
                maxHeight: "90vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                p: 2,
              }}
            >
              <div className="youtubeContainer">
                {item.youtubeID ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeID}`}
                    title={item.title}
                    style={{ border: "none" }}
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
              <Typography variant="h6" sx={{ color: "black", pt: 2 }}>
                {item.title}
              </Typography>
              <Typography sx={{ mt: 2, color: "black" }}>
                {item.aboutModal}
              </Typography>
              {item.linktosite && (
                <Button
                  href={item.linktosite}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mt: 2 }}
                >
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

const Projects = () => {
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
};

export default Projects;
