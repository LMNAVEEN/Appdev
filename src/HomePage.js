// src/HomePage.js
import React from 'react';
import { Typography, Container, Box, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const welcomeMessage = `Welcome ${user?.name || 'Guest'}!`;

  const items = [
    {
      name: "Traditional Indian Wedding Halls",
      description: "Elegant halls for traditional Indian weddings.",
      image: "https://www.aurusjewels.com/cdn/shop/articles/indian_wedding_planning_guide_ultimate.jpg?v=1679913681"
    },
    {
      name: "Traditional Christian Wedding Halls",
      description: "Beautiful venues for Christian weddings.",
      image: "https://images.squarespace-cdn.com/content/v1/56d5acfd2fe131b4cc5ccdbc/1547080519948-YTVUUFXWR3794RFYJIYS/Zinich.Nieto.Reception.4.jpg"
    },
    {
      name: "Traditional Muslim Wedding Halls",
      description: "Spacious halls for Muslim weddings.",
      image: "https://www.linandjirsa.com/wp-content/uploads/004-sheraton-park-anaheim-muslim-pakistani-wedding-photography.jpg"
    }
  ];

  return (
    <Box className="homepage-container">
      <Container maxWidth="lg">
        <Box>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
          >
            <Typography variant="h2" align="center" gutterBottom className="hero-text">
              {welcomeMessage}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 50 }}
          >
            <Typography variant="h5" align="center" color="textSecondary" paragraph className="hero-subtext">
              Discover our exquisite venues and services!
            </Typography>
          </motion.div>
        </Box>

        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom className="section-title">
            Featured Venues
          </Typography>
          <Carousel
            autoPlay={false}
            indicators={false}
            navButtonsAlwaysVisible={true}
            sx={{ width: '100%', height: '200' }}
          >
            {items.map((item, i) => (
              <Paper key={i} elevation={15} className="carousel-item">
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ borderRadius: '20px', height: '500px', width: '100%', objectFit: 'cover' }} // Adjust the height here
                />
                <Box className="carousel-content">
                  <Typography variant="h5" className="carousel-title">{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                </Box>
              </Paper>
            ))}
          </Carousel>
        </Box>

        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom className="section-title">
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="feature-card">
                <CardMedia
                  component="img"
                  alt="Birthday Hall"
                  sx={{ height: '200px', objectFit: 'cover' }} // Adjust the height here
                  image="https://content.jdmagicbox.com/comp/coimbatore/n3/0422px422.x422.150511204659.e3n3/catalogue/vinu-hall-ramanathapuram-coimbatore-coimbatore-banquet-halls-f41ffpdb57.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Birthday Hall
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Celebrate your birthday with us
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="feature-card">
                <CardMedia
                  component="img"
                  alt="Party Hall"
                  sx={{ height: '200px', objectFit: 'cover' }} // Adjust the height here
                  image="https://depanache.in/depanache-ui/uploads/2022/07/Small-Party-Hall-Interior-Design-Ideas-De-Panache-4.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Party Hall
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Venues for Parties
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="feature-card">
                <CardMedia
                  component="img"
                  alt="Premium Hall"
                  sx={{ height: '200px', objectFit: 'cover' }} // Adjust the height here
                  image="https://prestigiousvenues.com/wp-content/uploads/bb-plugin/cache/Gala-Dinner-Venue-In-London-Gibson-Hall-Prestigious-Venues-panorama-e59dc799b93c25c0dc960e904af705e0-59099a98687f6.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Premium Hall
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Exclusive halls for VIP customers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom className="section-title">
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Amrith Menon
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    "This is the best e-commerce platform I have ever used!"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Joshua
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    "Amazing products and great customer service."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Mugesh
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    "I love the variety of products available on this platform."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      
    </Box>
  );
};

export default HomePage;
