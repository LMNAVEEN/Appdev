// src/AdminManagement.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './AdminManagement.css'; // Import the CSS file

const AdminList = ({ admins, onRemove }) => (
  <List className="existingAdmins">
    {admins.map((admin) => (
      <ListItem key={admin.id} className="adminListItem">
        <ListItemText primary={admin.username} className="listItemText" />
        <IconButton
          edge="end"
          className="deleteButton"
          onClick={() => onRemove(admin.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

const AdminManagement = () => {
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleAddAdmin = () => {
    setLoading(true);
    setTimeout(() => {
      setAdmins((prevAdmins) => [...prevAdmins, { id: Date.now(), ...newAdmin }]);
      setNewAdmin({ username: '', password: '' });
      setLoading(false);
    }, 1000);
  };

  const handleRemoveAdmin = (id) => {
    setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== id));
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom className="title">Admin Management</Typography>

      <Box className="register-section">
        <Typography variant="h6">Register New Admin</Typography>
        <TextField
          label="Username"
          name="username"
          value={newAdmin.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="textField"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newAdmin.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="textField"
        />
        <Button
          variant="contained"
          onClick={handleAddAdmin}
          disabled={loading}
          className="addButton"
        >
          {loading ? 'Adding...' : 'Add Admin'}
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Existing Admins</Typography>
        <AdminList admins={admins} onRemove={handleRemoveAdmin} />
      </Box>
    </Container>
  );
};

export default AdminManagement;
