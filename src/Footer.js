// src/Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'var(--footer-bg-color)', color: 'var(--text-color)', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a leading e-commerce platform providing a wide range of products and services to our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/home" color="inherit" variant="body2" display="block" gutterBottom>
              Home
            </Link>
            <Link href="/products" color="inherit" variant="body2" display="block" gutterBottom>
              Products
            </Link>
            <Link href="/about" color="inherit" variant="body2" display="block" gutterBottom>
              About
            </Link>
            <Link href="/contact" color="inherit" variant="body2" display="block" gutterBottom>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" href="https://facebook.com">
                <Facebook sx={{ '&:hover': { color: '#3b5998' } }} />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <Twitter sx={{ '&:hover': { color: '#1DA1F2' } }} />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <Instagram sx={{ '&:hover': { color: '#E1306C' } }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} My E-commerce. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
