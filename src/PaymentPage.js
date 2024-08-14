// src/PaymentPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import './PaymentPage.css';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentOption: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the backend API accepts POST requests for payments
      await axios.post('http://localhost:4000/payments', formData);

      // Navigate to the Profile Page with the payment details in state
      navigate('/profile', { state: { paymentDetails: formData } });
    } catch (error) {
      console.error('There was an error submitting the payment!', error);
      setError('Payment submission failed. Please try again.');
    }
  };

  return (
    <div className="payment-background">
      <video autoPlay muted loop className="background-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container component="main" maxWidth="xs" className="payment-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={10} className="payment-paper">
            <Typography component="h1" variant="h4" align="center" className="payment-title">
              Payment Details
            </Typography>
            {error && (
              <Typography color="error" align="center" className="payment-error">
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="payment-input"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="payment-input"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cardNumber"
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="payment-input"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="expiryDate"
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="payment-input"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cvv"
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="payment-input"
              />
              <FormControl variant="outlined" margin="normal" required fullWidth className="payment-input">
                <InputLabel id="paymentOption-label">Payment Option</InputLabel>
                <Select
                  labelId="paymentOption-label"
                  id="paymentOption"
                  name="paymentOption"
                  value={formData.paymentOption}
                  onChange={handleChange}
                  label="Payment Option"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="debit">Debit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: '20px', boxShadow: 6 }}
                className="payment-button"
              >
                Submit Payment
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};

export default PaymentPage;
