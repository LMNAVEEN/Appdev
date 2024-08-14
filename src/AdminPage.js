import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './AdminsPage.css'; // Import CSS for styling and animations

const AdminsPage = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins);

    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));
    if (!loggedInAdmin) {
      navigate('/admin-login'); // Redirect if not logged in
    } else {
      setAdminUser(loggedInAdmin);
    }
  }, [navigate]);

  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setUsername(admin.username);
    setPassword(admin.password);
    setIsDialogOpen(true);
  };

  const handleDelete = (username) => {
    if (adminUser.username === username) {
      alert('Cannot delete your own account');
      return;
    }

    const updatedAdmins = admins.filter(admin => admin.username !== username);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setAdmins(updatedAdmins);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentAdmin(null);
  };

  const handleUpdate = () => {
    if (adminUser.username === currentAdmin.username) {
      alert('Cannot update your own account');
      return;
    }

    const updatedAdmins = admins.map(admin =>
      admin.username === currentAdmin.username
        ? { username, password }
        : admin
    );
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setAdmins(updatedAdmins);
    handleDialogClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin-login');
  };

  return (
    <Container>
      <Paper className="admins-paper">
        <Typography variant="h4" component="h1" gutterBottom>
          Admins List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.username}>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(admin)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(admin.username)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="secondary" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminsPage;
