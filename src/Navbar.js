import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Menu as MenuIcon, Home, Event, Payment, AccountCircle, Info, ExitToApp, AdminPanelSettings, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar

const Navbar = ({ onToggleTheme, isDarkMode }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/home')}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate('/event-categories')}>
          <ListItemIcon><Event /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button onClick={() => navigate('/payment')}>
          <ListItemIcon><Payment /></ListItemIcon>
          <ListItemText primary="Payment" />
        </ListItem>
        <ListItem button onClick={() => navigate('/profile')}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => navigate('/admins')}>
          <ListItemIcon><AdminPanelSettings /></ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
        <ListItem button onClick={() => navigate('/admin-login')}>
          <ListItemIcon><Login /></ListItemIcon>
          <ListItemText primary="Admin Login" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className="navbar-title" onClick={() => navigate('/home')}>
              BOOK WITH US
            </Typography>
          </Box>
          <Box className="navbar-icons">
            <IconButton color="inherit" onClick={() => navigate('/home')} aria-label="home">
              <Home />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/event-categories')} aria-label="events">
              <Event />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/payment')} aria-label="payment">
              <Payment />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/profile')} aria-label="profile">
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/admin-login')} aria-label="admin login">
              <Login />
            </IconButton>
            <Switch checked={isDarkMode} onChange={onToggleTheme} aria-label="toggle theme" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Navbar;
