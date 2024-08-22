import "./navbar.scss";
import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from "framer-motion";

const drawerWidth = 240;
const navItems = ["Home", "Expertise", "Tech", "Projects", "Contact"];

const variants = {
    open: {
        clipPath: "circle(1200px at 50px 50px)",
        transition: {
            type: "spring",
            stiffness: 20,
        },
    },
    closed: {
        clipPath: "circle(30px at 50px 50px",
        transition: {
            delay: 0.4,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

const openningVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const closingVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};
function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <motion.div className="sidebar" animate={open ? "open" : "closed"} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <motion.div className="bg" variants={variants}>
        <motion.div className="links" variants={openningVariants}>
          {navItems.map(item=>(
              <motion.a
                href={`#${item}`}
                key={item}
                variants={closingVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClose={handleDrawerToggle}
              >
                {item}
              </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" className="navbar" elevation={0}>
        <div className="navbar_headings">
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
            >
              BergmanWebWorks
            </Typography>
          </div>
          <div className="navbar_links">
            <Box className="centerBox" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }} href={`#${item}`} className="navbar_buttons">
                  {item}
                </Button>
              ))}
            </Box>
          </div>
        </div>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
/*import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";

function Navbar() {
  return (
      <div className="navbar">
        <Sidebar />
        <div className="wrapper">
          <div>
          <span>BergmanWebWorks</span>
          </div>
          <div className="social">
            <a href="https://www.linkedin.com/in/sebastian-bergman-01061679/" target="_blank"><img src="/LinkedIn.webp" alt="LinkedIn logo" /></a>
            <a href="https://github.com/SebuBergman" target="_blank"><img src="/github-mark-white.png" alt="Github logo" /></a>
          </div>
        </div>
      </div>
  );
}

export default Navbar;*/