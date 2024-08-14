import React from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const BookingHistory = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Booking History
        </Typography>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <List>
            <ListItem>
              <ListItemText primary="John Doe" secondary="Booked on 2024-08-01" />
            </ListItem>
            {/* Add more bookings here */}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default BookingHistory;
