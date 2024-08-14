import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper, Grid, styled } from '@mui/material';
import './AdminLoginPage.css'; // Import CSS for animations and styles

const PaperStyled = styled(Paper)(({ theme, isRegistering }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease',
  ...(isRegistering && {
    transform: 'scale(1.05)',
  }),
}));

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const admin = admins.find(admin => admin.username === username && admin.password === password);
    
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const existingAdmin = admins.find(admin => admin.username === newUsername);
    
    if (existingAdmin) {
      alert('Admin already exists');
      return;
    }
    
    const newAdmin = { username: newUsername, password: newPassword };
    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));
    alert('Admin registered successfully');
    setNewUsername('');
    setNewPassword('');
  };

  return (
    <Container className="container">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <PaperStyled
            isRegistering={isRegistering}
            elevation={3}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {isRegistering ? 'Register New Admin' : 'Admin Login'}
            </Typography>
            <form
              className="form"
              onSubmit={isRegistering ? handleRegister : handleLogin}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete="username"
                autoFocus
                value={isRegistering ? newUsername : username}
                onChange={(e) => (isRegistering ? setNewUsername(e.target.value) : setUsername(e.target.value))}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={isRegistering ? newPassword : password}
                onChange={(e) => (isRegistering ? setNewPassword(e.target.value) : setPassword(e.target.value))}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
              >
                {isRegistering ? 'Register' : 'Login'}
              </Button>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                className="toggleButton"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Back to Login' : 'Register New Admin'}
              </Button>
            </form>
          </PaperStyled>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLoginPage;
