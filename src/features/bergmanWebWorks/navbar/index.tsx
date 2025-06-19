import { useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "./sidebar/toggleButton/ToggleButton";
import Links from "./sidebar/links/Links";

// Import styles
import "./styles.scss";

const drawerWidth = 240;
const navItems = [
  { label: "Home", id: "hero" },
  { label: "Expertise", id: "expertise" },
  { label: "Packages and Prices", id: "packages-prices" },
  { label: "References", id: "references" },
  { label: "Contact", id: "contact" },
];

// Import variants data
import { sidebarVariant } from "@hooks/variants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleNavbar, setVisibleNavbar] = useState(false);

  const toggleNavbarVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 800) {
      setVisibleNavbar(true);
    } else if (scrolled <= 800) {
      setVisibleNavbar(false);
    }
  };

  window.addEventListener("scroll", toggleNavbarVisible);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const sidebar = (
    <motion.div
      className="sidebar"
      animate={mobileOpen ? "open" : "closed"}
      onClick={handleDrawerToggle}
      style={{ textAlign: "center" }}
    >
      <motion.div className="bg" variants={sidebarVariant}>
        <Links />
      </motion.div>
      <ToggleButton />
    </motion.div>
  );

  return (
    <div>
      <div className="navbar">
        <div className={visibleNavbar ? "navbar_scrolling" : "navbar_heading"}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon className="navbar_menuIcon" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              className={
                visibleNavbar ? "navbar_pageLogo-Hidden" : "navbar_pageLogo"
              }
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              BergmanWebWorks
            </Typography>
          </div>
          <div className="navbar_links">
            <Box
              className="centerBox"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  sx={{ color: "#fff" }}
                  href={`#${item.label}`}
                  className="navbar_buttons"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </div>
          <div
            className={visibleNavbar ? "navbar_socialHidden" : "navbar_social"}
          >
            <a
              href="https://www.linkedin.com/in/sebastian-bergman-01061679/"
              target="_blank"
            >
              <img src="/LinkedIn.webp" alt="LinkedIn logo" />
            </a>
            <a href="https://github.com/SebuBergman" target="_blank">
              <img src="/github-mark-white.png" alt="Github logo" />
            </a>
          </div>
        </div>
      </div>
      <nav>
        <Drawer
          // @ts-ignore: animate is not a valid prop for Drawer, but leaving for framer-motion
          animate={open ? "open" : "closed"}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {sidebar}
        </Drawer>
      </nav>
    </div>
  );
}
