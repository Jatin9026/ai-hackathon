import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Fade,
} from "@mui/material";
import {
  PersonAdd,
  Login,
  Bolt,
  Lock,
  Star,
  Shield,
} from "@mui/icons-material";

const Welcome = () => {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#000000', py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Card elevation={0}>
            <CardContent sx={{ p: { xs: 4, md: 8 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <Shield sx={{ fontSize: 50, color: '#ffffff' }} />
                </Box>

                <Typography variant="h1" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
                  Face Authentication System
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 5, maxWidth: 600, mx: 'auto' }}>
                  Secure access with cutting-edge facial recognition technology.
                  <br />
                  Experience seamless authentication in milliseconds.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 5 }}>
                  <Button component={Link} to="/register" variant="contained" size="large" startIcon={<PersonAdd />} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                    Register New User
                  </Button>
                  <Button component={Link} to="/login" variant="outlined" size="large" startIcon={<Login />} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                    Login
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            Why Choose Our Platform?
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: 5, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                    <Bolt sx={{ fontSize: 40, color: '#ffffff' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>Fast Recognition</Typography>
                  <Typography variant="body2" color="text.secondary">Authenticate in under 2 seconds with our advanced AI algorithms</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: 5, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                    <Lock sx={{ fontSize: 40, color: '#ffffff' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>Secure Authentication</Typography>
                  <Typography variant="body2" color="text.secondary">Military-grade encryption protects your biometric data 24/7</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: 5, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                    <Star sx={{ fontSize: 40, color: '#ffffff' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>Easy to Use</Typography>
                  <Typography variant="body2" color="text.secondary">Intuitive interface designed for seamless user experience</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;
