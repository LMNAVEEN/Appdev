import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const PaymentSuccessPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box p={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1">
          Thank you for your payment. Your booking is confirmed.
        </Typography>
      </Box>
    </Container>
  );
};

export default PaymentSuccessPage;
