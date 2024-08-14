// src/ProfilePage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import './ProfilePage.css';

const ProfilePage = () => {
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  return (
    <Container component="main" maxWidth="md" className="profile-page">
      <Box p={3}>
        <Typography component="h1" variant="h4" className="profile-title">
          User Profile
        </Typography>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Card className="profile-card">
            <CardContent>
              <Typography variant="h6" className="profile-text">Name: {paymentDetails?.name || 'N/A'}</Typography>
              <Typography variant="h6" className="profile-text">Email: {paymentDetails?.email || 'N/A'}</Typography>
            </CardContent>
          </Card>
        </motion.div>
        {paymentDetails && (
          <>
            <Typography component="h2" variant="h5" className="profile-subtitle">
              Payment Details
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="payment-card">
                <CardContent>
                  <Typography variant="h6" className="payment-text">Amount: {paymentDetails.amount || 'N/A'}</Typography>
                  <Divider className="divider" />
                  <Typography variant="body1" className="payment-text">
                    Card Number: **** **** **** {paymentDetails.cardNumber.slice(-4)}
                  </Typography>
                  <Divider className="divider" />
                  <Typography variant="body2" className="payment-text">Expiry Date: {paymentDetails.expiryDate || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
