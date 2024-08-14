import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Grid, MenuItem, Select,
  FormControl, InputLabel, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Snackbar, Alert
} from '@mui/material';
import MaskedInput from 'react-text-mask';
import { motion } from 'framer-motion';
import './CheckoutForm.css';

const countries = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  // Add more countries as needed
];

const months = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => currentYear + index);

const cardNumberMask = [
  /[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/
];

const CheckoutForm = () => {
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setConfirmDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    const paymentDetails = {
      countryCode,
      mobileNumber,
      cardNumber,
      expiryDate: `${expiryMonth}/${expiryYear}`,
      cvv,
      amount
    };

    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {
        setSnackbarMessage('Payment successful and details saved!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to save payment details.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Failed to save payment details:', error);
      setSnackbarMessage('An error occurred while processing your payment.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="checkout-page">
      <Container component="main" maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="checkout-box">
            <Typography component="h1" variant="h5" className="checkout-title">
              Secure Payment
            </Typography>
            <Box component="form" onSubmit={handlePayNow} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Payment Amount"
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="checkout-input"
              />
              <FormControl fullWidth margin="normal" className="checkout-input">
                <InputLabel id="country-code-label">Country Code</InputLabel>
                <Select
                  labelId="country-code-label"
                  id="country-code"
                  value={countryCode}
                  label="Country Code"
                  onChange={handleCountryCodeChange}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="mobileNumber"
                label="Mobile Number"
                type="text"
                id="mobileNumber"
                autoComplete="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="checkout-input"
              />
              <FormControl fullWidth margin="normal" className="checkout-input">
                <InputLabel shrink htmlFor="cardNumber"></InputLabel>
                <MaskedInput
                  mask={cardNumberMask}
                  className="MuiInputBase-input MuiOutlinedInput-input"
                  placeholder="Card Details"
                  guide={false}
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </FormControl>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" className="checkout-input">
                    <InputLabel id="expiry-month-label">Expiry Month</InputLabel>
                    <Select
                      labelId="expiry-month-label"
                      id="expiryMonth"
                      value={expiryMonth}
                      onChange={(e) => setExpiryMonth(e.target.value)}
                      label="Expiry Month"
                    >
                      {months.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" className="checkout-input">
                    <InputLabel id="expiry-year-label">Expiry Year</InputLabel>
                    <Select
                      labelId="expiry-year-label"
                      id="expiryYear"
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value)}
                      label="Expiry Year"
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="cvv"
                label="CVV"
                type="password"
                id="cvv"
                autoComplete="cc-csc"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="checkout-input"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: '20px', boxShadow: 6 }}
                className="checkout-button"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Pay Now'}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{"Confirm Payment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to proceed with the payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckoutForm;
