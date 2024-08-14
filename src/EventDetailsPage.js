import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Container, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react'; // Import keyframes for custom animations

// Define keyframes for progress bar animation
const progressBarAnimation = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const EventDetailsPage = () => {
  const location = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();

  // Sample data
  const { description = 'A beautiful venue for your special events. Enjoy modern amenities and exceptional service.', image = 'https://via.placeholder.com/800x300', venueDetails = { description: 'Spacious hall with elegant decor.', capacity: '200 guests', amenities: ['Sound System', 'Projector', 'Catering'] }, pricing = { basePrice: '500.00', additionalCharges: '150.00', totalPrice: '650.00' }, contactInfo = { email: 'info@eventvenue.com', phone: '987-654-3210' } } = location.state || {};

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    date: '',
    guests: 0,
    catering: '',
    venue: ''
  });

  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    updateProgress();
  };

  const handleBookingConfirmation = () => {
    if (validateBookingDetails()) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate('/payment', { state: { category, description, image, bookingDetails } });
      }, 1000); // Simulate network delay
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const updateProgress = () => {
    const filledFields = Object.values(bookingDetails).filter(value => value).length;
    const totalFields = Object.keys(bookingDetails).length;
    setProgress((filledFields / totalFields) * 100);
  };

  const validateBookingDetails = () => {
    const { name, email, date, guests, venue, catering } = bookingDetails;
    return name && email && date && guests > 0 && venue && catering;
  };

  return (
    <Container component="main" maxWidth="md">
      <Box p={3}>
        <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={category}
            onError={(e) => e.target.src = 'https://via.placeholder.com/800x300'}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {category}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Booking Details
          </Typography>
          {/* Styled LinearProgress */}
          <Box sx={{ position: 'relative', height: 8, mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: '100%',
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#3f51b5',
                  animation: `${progressBarAnimation} 1s ease-in-out`,
                }
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {['name', 'email', 'date', 'guests'].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TextField
                    required
                    fullWidth
                    id={field}
                    name={field}
                    label={capitalizeFirstLetter(field)}
                    type={field === 'date' ? 'date' : field === 'email' ? 'email' : 'text'}
                    value={bookingDetails[field]}
                    onChange={handleInputChange}
                    InputLabelProps={field === 'date' ? { shrink: true } : {}}
                    InputProps={field === 'guests' ? { inputProps: { min: 1 } } : {}}
                  />
                </motion.div>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="catering-label">Catering Options</InputLabel>
                <Select
                  labelId="catering-label"
                  id="catering"
                  name="catering"
                  value={bookingDetails.catering}
                  onChange={handleInputChange}
                  label="Catering Options"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="venue-label">Select Venue</InputLabel>
                <Select
                  labelId="venue-label"
                  id="venue"
                  name="venue"
                  value={bookingDetails.venue}
                  onChange={handleInputChange}
                  label="Select Venue"
                >
                  <MenuItem value="Venue 1">Venue 1</MenuItem>
                  <MenuItem value="Venue 2">Venue 2</MenuItem>
                  <MenuItem value="Venue 3">Venue 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookingConfirmation}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking and Proceed to Payment'}
            </Button>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Venue Details
          </Typography>
          <Typography variant="body1">
            {venueDetails.description || 'No additional details available.'}
          </Typography>
          <Typography variant="body1">
            <strong>Capacity:</strong> {venueDetails.capacity || 'Not specified'}
          </Typography>
          <Typography variant="body1">
            <strong>Amenities:</strong> {venueDetails.amenities?.join(', ') || 'None'}
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Pricing Information
          </Typography>
          <Typography variant="body1">
            <strong>Base Price:</strong> ${pricing.basePrice || '0.00'}
          </Typography>
          <Typography variant="body1">
            <strong>Additional Charges:</strong> ${pricing.additionalCharges || '0.00'}
          </Typography>
          <Typography variant="body1">
            <strong>Total Price:</strong> ${pricing.totalPrice || '0.00'}
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {contactInfo.email || 'info@eventvenue.com'}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {contactInfo.phone || '987-654-3210'}
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Inquiry Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="inquiry-name"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="inquiry-email"
                label="Email"
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="inquiry-message"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => alert('Inquiry submitted!')}
            >
              Send Inquiry
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default EventDetailsPage;
