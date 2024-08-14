import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Sample categories data
const categories = [
  {
    name: 'Weddings',
    description: 'Elegant venues for your special day',
    image: 'https://cdn0.weddingwire.in/vendor/6799/3_2/640/jpg/wedding-venue-the-grand-regent-banquet-hall-5_15_326799-160619966768379.jpeg'
  },
  {
    name: 'Corporate Events',
    description: 'Professional spaces for your business needs',
    image: 'https://media.istockphoto.com/id/498049757/photo/banquet-hall.webp?b=1&s=170667a&w=0&k=20&c=RYHN-vGCwK1NzoytNSuPEIk2MZXMIHxYX2UY5i_edcQ='
  },
  {
    name: 'Birthday Parties',
    description: 'Fun and lively venues for birthdays',
    image: 'https://www.theparkhotels.com/images/site-specific/chennai/meetings/banquets_banner.jpg'
  },
  {
    name: 'Conferences',
    description: 'Well-equipped venues for conferences',
    image: 'https://content.jdmagicbox.com/v2/comp/bangalore/d3/080pxx80.xx80.230905213255.m6d3/catalogue/sk-party-hall-bangalore-banquet-halls-kqhp70uh0u.jpg'
  },
  {
    name: 'Private Parties',
    description: 'Intimate settings for private gatherings',
    image: 'https://assets.indiaonline.in/cat-default/450/Banquet-Party-Halls-Lawns.jpg'
  },
  {
    name: 'Charity Events',
    description: 'Spaces for charitable events and fundraisers',
    image: 'https://weddingimage.betterhalf.ai//weddings/777c8603-b07d-4193-849b-06646df35e65/admin_uploads/46e5b266-b153-4f8b-ab4f-5d144d9165a9.jpg'
  }
];

const EventCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryClick = (category) => {
    navigate(`/event-details/${category.name}`, { state: category });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom align="center">
        Event Categories
      </Typography>
      <TextField
        fullWidth
        id="search"
        label="Search Events"
        variant="outlined"
        onChange={handleSearch}
        value={searchTerm}
      />
      <Grid container spacing={4} justifyContent="center" mt={2}>
        {filteredCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3, cursor: 'pointer' }}
                onClick={() => handleCategoryClick(category)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/140'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventCategoriesPage;
