import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button } from "@mui/material";
import { slowVariant } from "@hooks/variants";

import "./styles.scss";

// Define your prop types
interface SingleProps {
  item: {
    id: string | number;
    title: string;
    desc: string;
    aboutProject: string;
    tags: string[];
    linktosite: string;
    img: string;
    alt: string;
    youtubeID?: string;
    imageSize?: string | number;
    aboutModal?: string;
    modalLink?: string;
  };
}

export default function Single({ item }: SingleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
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
            style={{ cursor: "pointer" }}
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
}
