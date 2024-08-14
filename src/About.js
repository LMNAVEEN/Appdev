// src/About.js
import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <Container className="container" maxWidth="md">
      <Paper className="paper" elevation={3}>
        <Typography className="title" variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography className="paragraph" variant="body1" paragraph>
          Welcome to our Hall Booking System! We are dedicated to providing an easy and efficient way to book halls for various events and occasions. Our mission is to streamline the booking process and offer a seamless experience for our users.
        </Typography>
        <Typography className="paragraph" variant="body1" paragraph>
          Our platform allows you to browse available halls, check their features, and book them online with just a few clicks. We cater to all types of events, from weddings and parties to corporate meetings and conferences.
        </Typography>
        <Typography className="paragraph" variant="body1" paragraph>
          We pride ourselves on offering high-quality service and support to ensure that your event is a success. Our team is here to assist you with any queries or concerns you may have.
        </Typography>
        <Typography className="paragraph" variant="body1" paragraph>
          Thank you for choosing our Hall Booking System. We look forward to helping you find the perfect venue for your next event!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
