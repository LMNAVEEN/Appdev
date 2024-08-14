// src/AdminDashboard.js
import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import EventDetailsPage from './EventDetailsPage';
import { Close as CloseIcon } from '@mui/icons-material';

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, category: 'Wedding', description: 'Elegant wedding venue', image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_752,h_500/https://www.sloshout.com/blog/wp-content/uploads/What-to-Look-For-When-Booking-Party-Hall-for-20-Members.jpg' },
    { id: 2, category: 'Conference', description: 'Modern conference hall', image: 'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Cover-image-Party-Halls-in-Dubai.jpg' },
    // Add more sample events as needed
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ category: '', description: '', image: '' });
  const [editEvent, setEditEvent] = useState(null);

  const handleAddEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEventChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (newEvent.category && newEvent.description && newEvent.image) {
      setEvents((prev) => [
        ...prev,
        { ...newEvent, id: prev.length + 1 }
      ]);
      setNewEvent({ category: '', description: '', image: '' });
      setShowAddDialog(false);
    }
  };

  const handleEditEvent = () => {
    if (editEvent.category && editEvent.description && editEvent.image) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editEvent.id ? editEvent : event
        )
      );
      setEditEvent(null);
      setShowEditDialog(false);
    }
  };

  const handleRemoveEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleOpenEditDialog = (event) => {
    setEditEvent(event);
    setShowEditDialog(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box mb={3}>
        <Button variant="contained" color="primary" onClick={() => setShowAddDialog(true)}>
          Add New Event
        </Button>
      </Box>
      <Grid container spacing={3}>
        {events.map(event => (
          <Grid item xs={12} md={4} key={event.id}>
            <EventDetailsPage 
              category={event.category}
              description={event.description}
              image={event.image}
              onEdit={() => handleOpenEditDialog(event)}
              onRemove={() => handleRemoveEvent(event.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>
          Add New Event
          <IconButton edge="end" color="inherit" onClick={() => setShowAddDialog(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            value={newEvent.category}
            onChange={handleAddEventChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newEvent.description}
            onChange={handleAddEventChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newEvent.image}
            onChange={handleAddEventChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>
          Edit Event
          <IconButton edge="end" color="inherit" onClick={() => setShowEditDialog(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editEvent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="outlined"
                value={editEvent.category}
                onChange={handleEditEventChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={editEvent.description}
                onChange={handleEditEventChange}
              />
              <TextField
                margin="dense"
                name="image"
                label="Image URL"
                type="text"
                fullWidth
                variant="outlined"
                value={editEvent.image}
                onChange={handleEditEventChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditEvent}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
