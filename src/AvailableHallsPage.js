// src/AvailableHallsPage.js
import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AvailableHallsPage = () => {
  const [halls, setHalls] = useState([]);
  const { search } = useLocation();
  
  const queryParams = new URLSearchParams(search);
  const event = queryParams.get('event');
  const latitude = queryParams.get('lat');
  const longitude = queryParams.get('lng');

  useEffect(() => {
    if (event && latitude && longitude) {
      // Fetch the available halls based on the event and location
      // Replace with your actual API request
      fetch(`http://localhost:5000/halls?event=${event}&lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => setHalls(data))
        .catch(error => console.error('Error fetching halls:', error));
    }
  }, [event, latitude, longitude]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Halls for {event}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Location: Latitude {latitude}, Longitude {longitude}
      </Typography>
      <Grid container spacing={4}>
        {halls.map((hall, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {hall.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hall.description}
                </Typography>
                {/* Include more details as needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableHallsPage;
