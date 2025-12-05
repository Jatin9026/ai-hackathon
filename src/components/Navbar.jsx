import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import {
  Shield,
  Menu as MenuIcon,
  Close,
  Description,
  Logout,
} from "@mui/icons-material";

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" || path === "/welcome") {
      return location.pathname === "/" || location.pathname === "/welcome";
    }
    return location.pathname === path;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={isActive("/")}
            onClick={handleDrawerToggle}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/register"
                selected={isActive("/register")}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                selected={isActive("/login")}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/interview"
                selected={isActive("/interview")}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary="Interview Prep" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/resume"
                selected={isActive("/resume")}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <Description sx={{ mr: 1 }} />
                <ListItemText primary="Resume" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  logout();
                  handleDrawerToggle();
                }}
                sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                <Logout sx={{ mr: 1 }} />
                <ListItemText primary={`Logout (${currentUser})`} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: '#000000', color: '#ffffff' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
              <Shield sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={700} color="primary.main">
                Copilot
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <Button
                component={Link}
                to="/"
                color={isActive("/") ? "primary" : "inherit"}
                variant={isActive("/") ? "contained" : "text"}
              >
                Home
              </Button>
              
              {!isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/register"
                    color={isActive("/register") ? "primary" : "inherit"}
                    variant={isActive("/register") ? "contained" : "text"}
                  >
                    Register
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    color={isActive("/login") ? "primary" : "inherit"}
                    variant={isActive("/login") ? "contained" : "text"}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/interview"
                    color={isActive("/interview") ? "primary" : "inherit"}
                    variant={isActive("/interview") ? "contained" : "text"}
                  >
                    Interview Prep
                  </Button>
                  <Button
                    component={Link}
                    to="/resume"
                    color={isActive("/resume") ? "primary" : "inherit"}
                    variant={isActive("/resume") ? "contained" : "text"}
                    startIcon={<Description />}
                  >
                    Resume
                  </Button>
                  <Button
                    onClick={logout}
                    variant="contained"
                    startIcon={<Logout />}
                  >
                    Logout ({currentUser})
                  </Button>
                </>
              )}
            </Stack>

            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
