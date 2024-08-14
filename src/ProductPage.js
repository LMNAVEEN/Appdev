// src/ProductPage.js
import React from 'react';
import { Container, Typography, Grid, Paper, Button, IconButton, Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import './ProductPage.css';

const ProductPage = () => {
  const product = {
    name: "Elegant Watch",
    description: "A sophisticated and elegant watch designed for the modern individual.",
    price: "$299.99",
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg"
    ],
    reviews: [
      { user: "Alice", rating: 5, comment: "Absolutely love this watch! Highly recommend." },
      { user: "Bob", rating: 4, comment: "Very stylish but a bit expensive." }
    ]
  };

  return (
    <Container component="main" maxWidth="lg" className="product-page">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className="image-gallery">
          {product.images.map((image, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="image-item">
              <img src={image} alt={`Product image ${index + 1}`} className="product-image" />
            </motion.div>
          ))}
        </Grid>
        <Grid item xs={12} md={6} className="product-details">
          <Typography variant="h4" component="h1" className="product-name">
            {product.name}
          </Typography>
          <Typography variant="h5" component="h2" className="product-price">
            {product.price}
          </Typography>
          <Typography variant="body1" component="p" className="product-description">
            {product.description}
          </Typography>
          <Button variant="contained" color="primary" className="add-to-cart-button">
            Add to Cart
          </Button>
          <Divider className="divider" />
          <Box className="reviews-section">
            <Typography variant="h6" component="h3" className="reviews-title">
              Customer Reviews
            </Typography>
            {product.reviews.map((review, index) => (
              <Box key={index} className="review">
                <Typography variant="body2" component="p" className="review-user">
                  {review.user}:
                </Typography>
                <Typography variant="body2" component="p" className="review-comment">
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box className="related-products">
        <Typography variant="h5" component="h2" className="related-products-title">
          Related Products
        </Typography>
        {/* Add related products here */}
      </Box>
    </Container>
  );
};

export default ProductPage;
