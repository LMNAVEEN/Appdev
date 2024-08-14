import React from 'react';
import { Typography, Container, Box, Paper, TextField, Button } from '@mui/material';

const BookingForm = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Booking Form
        </Typography>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <form>
            <TextField fullWidth label="Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Date" margin="normal" type="date" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Number of Guests" margin="normal" type="number" />
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default BookingForm;
