import "./navbar.scss";
import Sidebar from "../sidebar/Sidebar";
import { useState } from 'react';
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

const drawerWidth = 240;
const navItems = ["Home", "Expertise", "Tech", "Projects", "Contact"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Sidebar />
    </Box>
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
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              BergmanWebWorks
            </Typography>
          </div>
          <div className="navbar_links">
            <Box className="centerBox">
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
            display: { xs: 'block', sm: 'none' },
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
        <Sidebar/>
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