// src/HallList.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHalls = async () => {
      const location = JSON.parse(localStorage.getItem('userLocation'));

      if (location) {
        const { latitude, longitude } = location;

        // Fetch halls from your API
        try {
          const response = await fetch(`/api/halls?lat=${latitude}&lng=${longitude}`);
          const data = await response.json();
          setHalls(data);
        } catch (error) {
          console.error('Error fetching halls', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHalls();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Nearby Halls
      </Typography>
      <Grid container spacing={3}>
        {halls.map((hall) => (
          <Grid item xs={12} sm={6} md={4} key={hall.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={hall.image}
                alt={hall.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {hall.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hall.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HallList;
